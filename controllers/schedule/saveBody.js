const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");

module.exports = {
	post: async (req, res) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt_decode(token);
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
					id: decoded._id,
					message: "스케줄의 내용이 정상적으로 작성되었습니다",
				}); //회원 id
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
