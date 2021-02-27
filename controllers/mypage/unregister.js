const usersModel = require("../../models/user");
const scheduleModel = require("../../models/schedule");

module.exports = {
	delete: async (req, res) => {
		//! 인증은 아직 안함
		try {
			/**
			 * 1. 내가 쓴글 삭제
			 * 2. 내가 작성한 좋아요/ 싫어요 삭제
			 * 3. 내정보 삭제
			 */
			await scheduleModel.remove({ userInfo: req.params.userid });
			await scheduleModel.updateMany(
				{},
				{ $pull: { bestWorst: { userInfo: req.params.userid } } }
			);
			await usersModel.remove({ _id: req.params.userid });
			return res
				.status(200)
				.json({ message: "정상적으로 회원탈퇴가 처리되었습니다" });
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
};
