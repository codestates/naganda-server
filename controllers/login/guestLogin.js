const jwt = require("jsonwebtoken");
const usersModel = require("../../models/user");
require("dotenv").config();

module.exports = {
	post: async (req, res) => {
		try {
			// 0. guest 회원정보 추가
			const guest = new usersModel({
				nickname: "guest" + Date.now().toString(),
				email: "guest" + Date.now().toString() + "@guest.com",
				password: "guest1234",
			});
			await guest.save();
			// 1. _id를 토근 생성에 사용한다. (페이로드, 비밀키, 토큰정보, 콜백함수)
			const accessToken = jwt.sign(
				{ _id: guest._id },
				process.env.JWT_ACESS_SECRET,
				{ expiresIn: "3h" }
			);
			const refreshToken = jwt.sign(
				{ _id: guest._id },
				process.env.JWT_REFRESH_SECRET,
				{ expiresIn: "1d" }
			);
			// 3. refreshToken을 DB에 넣어준다 (update)
			await usersModel.updateOne(
				{ _id: guest._id },
				{ $set: { refreshToken: refreshToken } },
				{ upsert: true },
				(err) => {
					if (err) console.log(err);
					else {
						return res
							.set("Refresh-Token", refreshToken)
							.set("Access-Control-Expose-Headers", "Refresh-Token")
							.status(200)
							.json({
								accessToken: accessToken,
								message: "Guest Login success!",
							});
					}
				}
			);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
