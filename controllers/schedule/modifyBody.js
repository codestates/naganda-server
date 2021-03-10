const scheduleModel = require("../../models/schedule");

module.exports = {
	put: async (req, res) => {
		try {
			await scheduleModel.updateOne(
				{
					_id: req.params.scheduleid,
				},
				{ $set: req.body },
				{ upsert: true },
				(err) => {
					if (err) {
						console.log(err);
					}
				}
			);
			return res
				.status(200)
				.json({ id: req.params.scheduleid, message: "스케줄 내용이 잘 변경되었습니다" });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
