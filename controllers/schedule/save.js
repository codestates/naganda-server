const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");

module.exports = {
	post: async (req, res) => {
		//! req.body 테스트 필요 (+프론트)
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt_decode(token);
			let item = req.files.map((file) => {
				return { img: file.key };
			});
			const addSchedule = await new scheduleModel({
				thumbnail: item,
				scheduleTitle: req.body.scheduleTitle,
				hashtag: req.body.hashtag,
				detail: req.body.detail,
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
