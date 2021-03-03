const scheduleModel  = require('../../models/schedule')
const jwt_decode = require('jwt-decode'); 

module.exports = {
    post: async (req, res) => {
		try {
            const token = req.headers.authorization.split(" ")[1];
            var decoded = jwt_decode(token);
            await scheduleModel.findOne({ _id: req.params.scheduleid, "bestWorst.userInfo": decoded._id }, async (err, schedule) => {
                if(!schedule) {
                    let user = { userInfo: decoded._id, best: req.body.best, worst: req.body.worst }
                    scheduleModel.updateOne({_id: req.params.scheduleid}, {$push: {bestWorst: user}}, (err, result) => {
                        if (err) return res.status(400).json({message: "best worst 등록 실패" });
                        res.status(200).json({message: "best worst 등록 완료" });
                    })
                } else {
                    await scheduleModel.updateOne({"bestWorst.userInfo": decoded._id}, {$set: {"bestWorst.$.best": req.body.best, "bestWorst.$.worst": req.body.worst}}, async (err, result) => {
                        if (err) return res.status(400).json({message: "best worst 업데이트 실패" });
                        await scheduleModel.findOne({ _id: req.params.scheduleid, "bestWorst.userInfo": decoded._id }, async (err, data) => {
                            console.log(data)
                            await scheduleModel.updateOne({_id: req.params.scheduleid}, {$pull: {bestWorst: {best: 0, worst: 0}}}, (err, final) => {
                                console.log(final)
                                return res.status(200).json({message: "best worst 리셋 완료" });
                            })
                            res.status(200).json({message: "best worst 업데이트 완료" });
                        })
                    })
                }
                
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}