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
				hashtag: req.body.hashtag,
				userInfo: decoded._id,
			});
			console.log(addSchedule);
			addSchedule.save().then((data) => console.log(data));
			return res.status(200).json({ id: decoded._id }); //회원 id
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
