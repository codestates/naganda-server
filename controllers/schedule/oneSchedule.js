const scheduleModel = require("../../models/schedule");

module.exports = {
	get: async (req, res) => {
		try {
			const findSchedule = await scheduleModel.findOne({
				_id: req.params.scheduleid,
			});
			const findUserInfo = await scheduleModel
				.findOne({
					userInfo: findSchedule.userInfo,
				})
				.populate("userInfo");
			const needUserInfo = {
				nickname: findUserInfo.userInfo.nickname,
				email: findUserInfo.userInfo.email,
			};
			const detailArr = function (arr) {
				let test = arr;
				let titleArr = ["🌳Morning", "🍄Afternoon", "🌝Midnight", "👀Empty"];
				let result = [
					{ title: titleArr[0], id: "list-0", cards: [] },
					{ title: titleArr[1], id: "list-1", cards: [] },
					{ title: titleArr[2], id: "list-2", cards: [] },
					{ title: titleArr[3], id: "list-3", cards: [] },
				];
				let oneObj = {};
				for (let i = 0; i < test.length; i++) {
					let index = titleArr.indexOf(test[i].position);
					oneObj.id = test[i].cardsId;
					oneObj.detailTitle = test[i].detailTitle;
					oneObj.time = test[i].time;
					oneObj.place = test[i].place;
					oneObj.text = test[i].comment;
					result[index].cards.push(oneObj);
					oneObj = {};
				}
				return result;
			};
			let mycardArr = detailArr(findSchedule.detail);
			const result = {
				hashtag: findSchedule.hashtag,
				best: findSchedule.best,
				worst: findSchedule.worst,
				bookmark: findSchedule.bookmark,
				thumbnail: findSchedule.thumbnail,
				scheduleTitle: findSchedule.scheduleTitle,
				detail: mycardArr,
				userInfo: needUserInfo,
			};
			return res.status(200).json(result);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
