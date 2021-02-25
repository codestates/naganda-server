const scheduleModel = require("../../models/schedule");

module.exports = {
	put: async (req, res) => {
		console.log(req.body);
		try {
			let findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});

			await scheduleModel.replaceOne(
				{
					_id: req.params.scheduleid,
				},
				{
					thumbnail: req.body.thumbnail,
					scheduleTitle: req.body.scheduleTitle,
					hashtag: req.body.hashtag,
					detail: req.body.detail,
					userInfo: findSchedule.userInfo,
				}
			);
			return res.status(200).json({ id: findSchedule.userInfo });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
