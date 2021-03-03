const usersModel = require("../../models/user");
const scheduleModel = require("../../models/schedule");
const jwt_decode = require('jwt-decode');

module.exports = {
	delete: async (req, res) => {
		try {
			/**
			 * 1. 내가 쓴글 삭제
			 * 2. 내가 작성한 좋아요/ 싫어요 삭제
			 * 3. 내정보 삭제
			 */
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
				.json({ message: "정상적으로 회원탈퇴가 처리되었습니다" });
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
};
