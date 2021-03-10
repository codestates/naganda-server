const scheduleModel = require("../../models/schedule");

module.exports = {
	post: async (req, res) => {
		try {
			const addBody = await scheduleModel.updateOne(
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
			console.log(addBody);
			return res
				.status(200)
				.json({
					id: req.params.scheduleid,
					message: "스케줄의 내용이 정상적으로 작성되었습니다",
				});
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
