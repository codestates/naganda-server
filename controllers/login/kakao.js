require("dotenv").config();
const clientID = process.env.KAKAO_CLIENT_ID;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;
const axios = require("axios");
const usersModel = require("../../models/user");
const jwt = require("jsonwebtoken");
const qs = require("qs");

module.exports = {
	post: async (req, res) => {
		const { code } = req.body.authorizationCode;
		axios({
			method: "POST",
			url: `https://kauth.kakao.com/oauth/token`,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
			data: qs.stringify({
				grant_type: "authorization_code",
				client_id: clientID,
				client_secret: clientSecret,
				redirect_uri: "http://localhost:3000/signin",
				code: code,
			}),
		})
			.then((res) => {
				console.log(res.data);
				const accessToken = res.data.access_token;
				let response = axios.get("https://kapi.kakao.com/v2/user/me", {
					headers: {
						authorization: `Bearer ${accessToken}`,
						"content-type": "application/x-www-form-urlencoded",
					},
				});
				return response;
			})
			.then(async (res2) => {
				const alreadyUser = await usersModel.findOne({
					email: res2.data.kakao_account.email,
				});
				if (alreadyUser) {
					const accessToken = jwt.sign(
						{ _id: alreadyUser._id },
						process.env.JWT_ACESS_SECRET,
						{ expiresIn: "3h" }
					);
					const refreshToken = jwt.sign(
						{ _id: alreadyUser._id },
						process.env.JWT_REFRESH_SECRET,
						{ expiresIn: "1d" }
					);
					await usersModel.updateOne(
						{ _id: alreadyUser._id },
						{ $set: { refreshToken: refreshToken } },
						{ upsert: true },
						(err) => {
							if (err) console.log(err);
							else {
								return res
									.set("Refresh-Token", refreshToken)
									.set("Access-Control-Expose-Headers", "Refresh-Token")
									.status(200)
									.json({ accessToken: accessToken, message: "재로그인 성공" });
							}
						}
					);
				} else {
					const newUser = new usersModel({
						email: res2.data.kakao_account.email,
						password: `kakao${res2.data.id}`,
						nickname: res2.data.properties.nickname,
					});
					await newUser.save();
					const findUser = await usersModel.findOne({
						email: res2.data.kakao_account.email,
					});
					console.log(findUser);
					const accessToken = jwt.sign(
						{ _id: findUser._id },
						process.env.JWT_ACESS_SECRET,
						{ expiresIn: "3h" }
					);
					const refreshToken = jwt.sign(
						{ _id: findUser._id },
						process.env.JWT_REFRESH_SECRET,
						{ expiresIn: "1d" }
					);
					await usersModel.updateOne(
						{ _id: findUser._id },
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
										message: "Login success!",
									});
							}
						}
					);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
