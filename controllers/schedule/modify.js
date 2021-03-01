const scheduleModel = require("../../models/schedule");
const { s3 } = require("../../router/multer");

module.exports = {
	put: async (req, res) => {
		try {
			let findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			let oldImg = findSchedule.thumbnail.map(item => { return {Key: item.img}});
			var params = {
				Bucket: "naganda", 
				Delete: {
					Objects: oldImg, 
					Quiet: false
				}
			};
			s3.deleteObjects(params, function(err) {
				console.log(err)
			});
			let item = req.files.map(file => {return {img: file.key}});
			await scheduleModel.replaceOne(
				{
					_id: req.params.scheduleid,
				},
				{
					thumbnail: item,
					scheduleTitle: req.body.scheduleTitle,
					hashtag: req.body.hashtag,
					detail: req.body.detail,
					userInfo: findSchedule.userInfo,
				}
			);
			return res.status(200).json({ id: findSchedule.userInfo });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
