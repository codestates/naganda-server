const scheduleModel = require("../../models/schedule");

module.exports = {
	get: async (req, res) => {
		try {
			const findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			const findUserInfo = await scheduleModel
				.findOne({
					userInfo: findSchedule.userInfo,
				})
				.populate("userInfo");
			const needUserInfo = {
				nickname: findUserInfo.userInfo.nickname,
				email: findUserInfo.userInfo.email,
			};
			const result = {
				hashtag: findSchedule.hashtag,
				best: findSchedule.best,
				worst: findSchedule.worst,
				bookmark: findSchedule.bookmark,
				thumbnail: findSchedule.thumbnail,
				scheduleTitle: findSchedule.scheduleTitle,
				detail: findSchedule.detail,
				userInfo: needUserInfo,
			};
			return res.status(200).json(result);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
