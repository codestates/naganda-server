const usersModel = require("../../models/user");
const scheduleModel = require("../../models/schedule");

module.exports = {
	post: async (req, res) => {
		//! 인증은 아직 안함
		try {
			const jwt_decode = require("jwt-decode");
			const token = req.headers.authorization.split(" ")[1];
			var decoded = jwt_decode(token);

			await scheduleModel.remove({ userInfo: decoded._id });
			await scheduleModel.updateMany(
				{},
				{ $pull: { bestWorst: { userInfo: decoded._id } } }
			);
			await usersModel.remove({ _id: decoded._id });
			return res
				.status(200)
				.json({ message: "게스트 로그아웃이 정상적으로 처리되었습니다" });
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
};
