const scheduleModel  = require('../../models/schedule')

//todo 전달된 해쉬태그 단어가 포함된 스케쥴 전부 검색
//todo regex : "s" --> s가 포함되어있는것을 찾기 / $regex : "s$" --> 끝자리가 s인것을 찾기 / $regex : "^s" --> 첫자리가 s인것을 찾기
module.exports = {
    get: (req, res) => {
        console.log(req.body.hashtag)
        scheduleModel.find({hashtag: {$regex: req.body.hashtag}}, (err, data) => {
            console.log(data)
            if (err) return res.status(400).send(err);
            res.status(200).json(data);
          })
    }
}
