const jwt = require("jsonwebtoken");
const usersModel = require("../../models/user");
require("dotenv").config();

module.exports = {
	post: async (req, res) => {
		try {
			// req.body = email, password;
			const { email, password } = req.body;
			// 1. req.body로 부터 받아낸 정보를 토대로 _id를 구해온다.
			const userInfo = await usersModel.findOne({ email });
			// 1-1. 만약 기존 회원이 아니면 error 메시지 보낸다.
			if (!userInfo) {
				return res.status(400).json({
					message: "등록된 정보가 없습니다. 회원가입을 진행해 주세요.",
				});
			}
			// 1-2. 만약 비밀번호가 틀리다면 error 메시지 보낸다.
			if (userInfo.password !== password) {
				return res
					.status(400)
					.json({ message: "잘못된 비밀번호 입니다. 다시 입력해 주세요." });
			}
			// 2. _id를 토근 생성에 사용한다. (페이로드, 비밀키, 토큰정보, 콜백함수)
			const accessToken = jwt.sign(
				{ _id: userInfo._id },
				process.env.JWT_ACESS_SECRET,
				{ expiresIn: "3h" }
			);
			const refreshToken = jwt.sign(
				{ _id: userInfo._id },
				process.env.JWT_REFRESH_SECRET,
				{ expiresIn: "1d" }
			);
			// 3. refreshToken을 DB에 넣어준다 (update)
			await usersModel.updateOne(
				{ _id: userInfo._id },
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
								headers: { refreshToken: refreshToken },
								accessToken: accessToken,
								message: "Login success!",
							});
					}
				}
			);
			// 4. 제작한 토큰을 이용해 client에 보내준다.
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
