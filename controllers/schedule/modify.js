const scheduleModel = require("../../models/schedule");
const { s3 } = require("../../router/multer");

module.exports = {
	patch: async (req, res) => {
		try {
			let findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			if (req.body.detail) {
				const detailArr = function () {
					const initialState = req.body.detail;
					let result = [];
					let titleArr = ["🌳Morning", "🍄Afternoon", "🌝Midnight", "👀Empty"];
					for (let i = 0; i < initialState.length; i++) {
						for (let j = 0; j < initialState[i].cards.length; j++) {
							result.push({
								position: titleArr[i],
								positionId: initialState[i].id,
								cardsId: initialState[i].cards[j].id,
								detailTitle: initialState[i].cards[j].detailTitle,
								time: initialState[i].cards[j].time,
								comment: initialState[i].cards[j].text,
								place: initialState[i].cards[j].place,
							});
						}
					}
					return result;
				};
				let mycardArr = detailArr();
				await scheduleModel.updateOne(
					{ _id: req.params.scheduleid },
					{
						$set: {
							scheduleTitle: req.body.scheduleTitle,
							hashtag: req.body.hashtag,
							detail: mycardArr,
							userInfo: findSchedule.userInfo,
						},
					}
				);
			}
			if (req.file) {
				await scheduleModel.findOne(
					{ _id: req.params.scheduleid },
					(err, data) => {
						if (data.thumbnail) {
							let oldImg = data.thumbnail.split("/")[4];
							s3.deleteObject(
								{
									Bucket: "naganda.tk",
									Key: oldImg,
								},
								(err) => {
									if (err) {
										throw err;
									}
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
					}
				);
			}
			const thumbnailPath = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			return res.status(200).json({
				id: findSchedule._id,
				thumbnail: thumbnailPath.thumbnail,
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
