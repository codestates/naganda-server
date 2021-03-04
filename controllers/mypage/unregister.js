const usersModel = require("../../models/user");
const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");
const { s3 } = require("../../router/multer");

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
			//! 스케줄 All 썸네일 버킷 삭제
			let findSchedule = await scheduleModel.find({
				userInfo: decoded._id,
			});
			let allSchedule = findSchedule.map((data) => {
				return data.thumbnail;
			});
			let filterImg = allSchedule.map((arr) => {
				return arr.map((thumbnail) => {
					return thumbnail.img;
				});
			});
			let oldImg = filterImg.reduce((a, b) => {
				return a.concat(b);
			}, []);
			let result = oldImg.map((el) => {
				return { Key: el };
			});
			var params = {
				Bucket: "naganda",
				Delete: {
					Objects: result,
					Quiet: false,
				},
			};
			s3.deleteObjects(params, function (err) {
				console.log(err);
			});
			//! 유저 아바타 버킷 삭제
			usersModel.findOne({ _id: decoded._id }, (err, data) => {
				if (data.avatar) {
					let avatar = data.avatar;
					s3.deleteObject(
						{
							Bucket: "naganda",
							Key: avatar,
						},
						function (err) {
							console.log(err);
						}
					);
				}
			});
			//! DB 회원탈퇴
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
