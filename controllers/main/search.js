const scheduleModel  = require('../../models/schedule')

//todo 전달된 해쉬태그 단어가 포함된 스케쥴 전부 검색
//todo regex : "s" --> s가 포함되어있는것을 찾기 / $regex : "s$" --> 끝자리가 s인것을 찾기 / $regex : "^s" --> 첫자리가 s인것을 찾기
module.exports = {
    post: async (req, res) => {
        try {
            if(req.body.hashtag.length === 0) {
                res.status(400).send("검색결과가 없습니다")
            } else {
                await scheduleModel.find({hashtag: {$regex: `${req.body.hashtag}`}}, (err, data) => {
                    console.log(data)
                    if (err) return res.status(400).send(err);
                    res.status(200).json(data);
                })
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
