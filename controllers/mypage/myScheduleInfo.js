const scheduleModel  = require('../../models/schedule');

module.exports = {
	get: async (req, res) => {
		try {
            const schedule = await scheduleModel.find({ userInfo: req.params.userid }).select('scheduleTitle thumbnail');
            console.log(schedule)
			return res.status(200).json(schedule);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
