const scheduleModel  = require('../../models/schedule')

module.exports = {
    post: async (req, res) => {
		try {
            await scheduleModel.updateOne({ _id: req.params.scheduleid }, {$set: { bookmark: req.body.bookmark }}, (err, data) => {
                if (err) return res.status(400).json({message: "해당 스케줄을 찾을 수 없습니다" });
                res.status(200).json({data:data.bookmark, message: "즐겨찾기 등록 완료" });
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}