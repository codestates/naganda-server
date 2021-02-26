const scheduleModel = require("../../models/schedule");

module.exports = {
	post: async (req, res) => {
		//! 현재 토근을 받아오는 것이 없기 때문에 누가 적었는지에 대한 정보 파악이 불가능한 관계로 일단은 단순히 값을 저장만 할 예정 (userInfo에 임시로 설정된 값을 넣을 예정)
		try {
			const addSchedule = await new scheduleModel({
				thumbnail: req.body.thumbnail,
				scheduleTitle: req.body.scheduleTitle,
				hashtag: req.body.hashtag,
				detail: req.body.detail,
				userInfo: "6035b635c3b5c3a3d57b0d8d",
			});
			addSchedule.save().then((data) => console.log(data));
			return res.status(200).json({ id: "6035b635c3b5c3a3d57b0d8d" }); //회원 id
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
