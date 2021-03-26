const scheduleModel = require("../../models/schedule");
const { s3 } = require("../../router/multer");

module.exports = {
	put: async (req, res) => {
		try {
			let findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			if (req.file) {
				scheduleModel.findOne({ _id: req.params.scheduleid }, (err, data) => {
					if (data.thumbnail) {
						let oldImg = data.thumbnail.split("/")[4];
						s3.deleteObject(
							{
								Bucket: "naganda.tk",
								Key: oldImg,
							}, (err) => {
								if (err) { throw err; }
							}
						);
					}
					scheduleModel.updateOne(
						{ _id: req.params.scheduleid },
						{ $set: { thumbnail: req.file.location } },
						{ upsert: true },
						(err) => {
							if (err) {
								return res
									.status(400)
									.json({ message: "스케줄을 찾을 수 없습니다" });
								}
						}
					);
				});
			} 
			await scheduleModel.updateOne(
				{ _id: req.params.scheduleid },
				{ $set: {
					scheduleTitle: req.body.scheduleTitle,
					hashtag: req.body.hashtag,
					detail: req.body.detail,
					userInfo: findSchedule.userInfo,
				} }
				
			);
			return res.status(200).json({ id: findSchedule.userInfo });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};