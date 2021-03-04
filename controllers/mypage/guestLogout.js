const usersModel = require("../../models/user");
const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");
const { s3 } = require("../../router/multer");

module.exports = {
	delete: async (req, res) => {
		console.log(req.body);
		try {
			const token = req.headers.authorization.split(" ")[1];
			var decoded = jwt_decode(token);
			//! 스케줄 All 썸네일 버킷 삭제
			// let findSchedule = await scheduleModel.findAll({
			// 	userInfo: decoded._id,
			// });
			// let allSchedule = findSchedule.map((data) => {
			// 	return data.thumbnail;
			// });
			// let filterImg = allSchedule.map((arr) => {
			// 	return arr.map((thumbnail) => {
			// 		return thumbnail.img;
			// 	});
			// });
			// let oldImg = filterImg.reduce((a, b) => {
			// 	return a.concat(b);
			// }, []);
			// let result = oldImg.map((el) => {
			// 	return { Key: el };
			// });
			// var params = {
			// 	Bucket: "naganda",
			// 	Delete: {
			// 		Objects: result,
			// 		Quiet: false,
			// 	},
			// };
			// s3.deleteObjects(params, function (err) {
			// 	console.log(err);
			// });
			// //! 유저 아바타 버킷 삭제
			let findInfo = await usersModel.findOne({ _id: decoded._id });
			// await usersModel.findOne({ _id: decoded._id }, (err, data) => {
			// 	if (data.avatar) {
			// 		let avatar = data.avatar;
			// 		s3.deleteObject(
			// 			{
			// 				Bucket: "naganda",
			// 				Key: avatar,
			// 			},
			// 			function (err) {
			// 				console.log(err);
			// 			}
			// 		);
			// 	}
			// });
			await scheduleModel.remove({ userInfo: decoded._id });
			await scheduleModel.updateMany(
				{},
				{ $pull: { bestWorst: { userInfo: decoded._id } } }
			);
			await usersModel.remove({ _id: decoded._id });
			return res.status(200).json({
				email: findInfo.email,
				message: "게스트 로그아웃이 정상적으로 처리되었습니다",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
};
