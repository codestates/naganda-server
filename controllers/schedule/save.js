const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");

module.exports = {
	post: async (req, res) => {
		//! req.body 테스트 필요 (+프론트)
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt_decode(token);
			const addSchedule = await new scheduleModel({
				thumbnail: req.file.location,
				scheduleTitle: req.body.scheduleTitle,
				hashtag: req.body.hashtag,
				detail: req.body.detail,
				userInfo: decoded._id,
			});
			console.log(addSchedule);
			addSchedule.save().then((data) => console.log(data));
			return res.status(200).json({ id: addSchedule._id }); //스케줄 id
		} catch (err) {
			console.log(err)
			return res.status(500).json(err);
		}
	},
};