const scheduleModel = require("../../models/schedule");
const { s3 } = require("../../router/multer");

module.exports = {
	put: async (req, res) => {
		try {
			let findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			let imgName = findSchedule.thumbnail.split("/");
			if (findSchedule.thumbnail) {
				s3.deleteObject(
					{ Bucket: "naganda.tk", Key: imgName[imgName.length - 1] },
					(err) => {
						console.log(err);
					}
				);
			}
			await scheduleModel.replaceOne(
				{
					_id: req.params.scheduleid,
				},
				{
					thumbnail: req.file.location,
					scheduleTitle: req.body.scheduleTitle,
					hashtag: req.body.hashtag,
					userInfo: findSchedule.userInfo,
				}
			);
			return res.status(200).json({ id: findSchedule._id });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
