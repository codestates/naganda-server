const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");

module.exports = {
	post: async (req, res) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt_decode(token);
			const addSchedule = await new scheduleModel({
				thumbnail: req.file.location,
				scheduleTitle: req.body.scheduleTitle,
				hashtag: [req.body.hashtag],
				userInfo: decoded._id,
			});
			addSchedule.save().then((data) => 
				res.status(200).json({id: data._id, message: '헤드가 정상적으로 저장되었습니다'})
			);
		} catch (err) {
			console.log(err)
			return res.status(500).json(err);
		}
	},
};
