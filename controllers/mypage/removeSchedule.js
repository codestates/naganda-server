const scheduleModel  = require('../../models/schedule');

module.exports = {
    delete: async (req, res) => {
        try {
            await scheduleModel.deleteOne({_id: req.params.scheduleid}, (err, data) => {
                if (err) return res.status(400).json({message: "스케줄 삭제 실패" });
                res.status(200).json({ message: "스케줄 삭제 완료" })
            })
        } catch (err) {
			return res.status(500).json(err);
		}
    }
}