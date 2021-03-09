const usersModel = require("../../models/user");
const { s3 } = require("../../router/multer");

module.exports = {
	patch: (req, res) => {
		console.log(req.file);
		try {
			const jwt_decode = require("jwt-decode");
			const token = req.headers.authorization.split(" ")[1];
			var decoded = jwt_decode(token);
			if (req.file) {
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
					usersModel.updateOne(
						{ _id: decoded._id },
						{ $set: { avatar: req.file.location } },
						{ upsert: true },
						(err) => {
							if (err)
								return res
									.status(400)
									.json({ message: "사용자를 찾을 수 없습니다" });
							return res.status(200).json({
								message: "썸네일 수정 완료",
								filePath: req.file.location,
								fileName: req.file.originalname,
							});
						}
					);
				});
			} else {
				usersModel.updateOne(
					{ _id: decoded._id },
					{ $set: req.body },
					(err, data) => {
						console.log(data);
						if (err)
							return res
								.status(400)
								.json({ message: "사용자를 찾을 수 없습니다" });
						return res
							.status(200)
							.json({ message: "정상적으로 수정되었습니다" });
					}
				);
			}
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
