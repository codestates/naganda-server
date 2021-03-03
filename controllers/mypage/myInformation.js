const usersModel = require("../../models/user");
const jwt_decode = require('jwt-decode'); 

module.exports = {
	get: async (req, res) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			var decoded = jwt_decode(token);
			const user = await usersModel.findOne({ _id: decoded._id });
			return res.status(200).json({
				avatar: user.avatar,
				nickname: user.nickname,
				email: user.email,
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
