const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	// 1) 만약에 req.headers.authorization에 값이 있는지 유무를 확인한다.
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, process.env.JWT_ACESS_SECRET, (err) => {
			if (err) {
				return res.status(401).json({ error: "접근 권한 없음" });
			} else {
				next();
			}
		});
	} else {
		return res.status(401).json({ error: "접근 권한 없음" });
	}
	// 1-1) 값이 없을 경우엔 접근할 수 없으므로 에러에러
	// 1-2) 값이 있을 경우엔 req.headers.authorization에 있는 'Bearer sdlfkjsdflkfj' 에서 토큰만 추출한다.
	// 2) 토큰 확인하기
	// 3) 토큰 확인중 문제가 없을 경우엔 next(), 그렇지 않을 경우엔 역시나 에러
};
