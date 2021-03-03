const scheduleModel  = require('../../models/schedule');
const jwt_decode = require('jwt-decode');

module.exports = {
	get: async (req, res) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			var decoded = jwt_decode(token);
            const schedule = await scheduleModel.find({ userInfo: decoded._id }).select('scheduleTitle thumbnail');
            console.log(schedule)
			return res.status(200).json(schedule);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
