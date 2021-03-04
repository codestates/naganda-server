const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	// 1) req.headers.authorization에 값이 있는지 유무를 확인한다
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		// 2) 받아온 token을 가지고 accessToken인지 refreshToken인지 아니면 뚱딴지 인지 알아낸다
		jwt.verify(token, process.env.JWT_ACESS_SECRET, (err, data) => {
			if (err) {
				jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, data) => {
					if (err) {
						//? 말도안되는 뚱딴지 토큰을 가져왔을 경우 접근 불가
						return res
							.status(401)
							.json({ message: "우리가 만든 토큰이 아닙니다" });
					} else {
						//? refreshToken이 증명되었을 경우
						//! 갱신조건 충족시 갱신 후 next (accessToken 갱신하기)
						// 리프레시가 오면 우리는 리프레시 토큰이 만료가 되었는지 확인하고 만료 안되면 토큰을 만들어주고 만료가 되었으면 다시 로그인 하라고 설정해줘야 함
						let curTime = Date.now() / 1000;
						if (curTime > data.exp) {
							//만료됨
							return res
								.status(401)
								.json({ message: "토큰이 만료되었습니다. 재로그인 해주세요" });
						} else {
							const reAccessToken = jwt.sign(
								{ _id: data._id },
								process.env.JWT_ACESS_SECRET,
								{ expiresIn: "3h" }
							);
							// reAccessToken을 어떻게 넘겨줄 것인가...
							res.set("reAccessToken", reAccessToken);
							next();
						}
					}
				});
			} else {
				console.log(data);
				//? accessToken이 증명되었을 경우
				next();
			}
		});
	} else {
		//? req.headers.authorization 값이 없는 경우 권한없음
		return res.status(401).json({ message: "토큰이 없습니다" });
	}
};

/**
 * 방법 1) accessToken하나로 기한을 확인하면서 계속 갱신시키기
 * 대신 기본 accessToken의 유효기간을 더 늘려줘야 할 필요가 있다
 * 방법 2) accessToken과 refreshToken으로 accessToken이 만료되면 refreshToken을 보내준다
 */
