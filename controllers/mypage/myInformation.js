const usersModel = require("../../models/user");

module.exports = {
	get: async (req, res) => {
		//! 인증은 아직 안함
		try {
			const user = await usersModel.findOne({ _id: req.params.userid });
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
