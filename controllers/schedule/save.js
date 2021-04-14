const scheduleModel = require("../../models/schedule");
const jwt_decode = require("jwt-decode");
module.exports = {
	post: async (req, res) => {
		try {
			if (req.body.scheduleTitle || req.body.hashtag || req.body.detail) {
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
				const token = req.headers.authorization.split(" ")[1];
				const decoded = jwt_decode(token);
				const addSchedule = await new scheduleModel({
					scheduleTitle: req.body.scheduleTitle,
					hashtag: req.body.hashtag,
					detail: mycardArr,
					userInfo: decoded._id,
				});
				addSchedule
					.save()
					.then((data) => data)
					.then((data) => res.status(200).json({ id: addSchedule._id, data }));
			} else if (req.file) {
				const token = req.headers.authorization.split(" ")[1];
				const decoded = jwt_decode(token);
				const addSchedule = await new scheduleModel({
					thumbnail: req.file.location,
					scheduleTitle: req.body.scheduleTitle,
					hashtag: req.body.hashtag,
					detail: req.body.detail,
					userInfo: decoded._id,
				});
				addSchedule
					.save()
					.then((data) => data)
					.then((data) =>
						res
							.status(200)
							.json({ id: addSchedule._id, thumbnail: data.thumbnail })
					);
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
};
