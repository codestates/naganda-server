const usersModel = require("../../models/user");
const validator = require("validator");
module.exports = {
	post: async (req, res) => {
		//console.log(validator.isEmail(req.body.email));
		try {
			const alreadyUser = await usersModel.findOne({ email: req.body.email });
			const alreadyNickname = await usersModel.findOne({
				nickname: req.body.nickname,
			});
			if (alreadyUser) {
				return res.status(409).json({ message: "이미 등록된 이메일 입니다." });
			}
			if (alreadyNickname) {
				return res.status(400).json({ message: "이미 사용중인 이름입니다." });
			}
			if (!validator.isEmail(req.body.email)) {
				return res
					.status(400)
					.json({ message: "올바른 이메일 형식이 아닙니다." });
			} else {
				const addUser = new usersModel({
					nickname: req.body.nickname,
					email: req.body.email,
					password: req.body.password,
				});
				await addUser.save();
				return res
					.status(200)
					.json({ nickname: addUser.nickname, email: addUser.email });
			}
		} catch (err) {
			if (err._message === "user validation failed") {
				return res.status(400).json({
					message:
						"비밀번호는 문자와 숫자 모두 사용하셔야 하며, 최소 8자 이상입니다.",
				});
			}
			return res.status(500).json(err);
		}
	},
};
