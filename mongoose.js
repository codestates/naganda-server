const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/naganda", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
//* 연결 실패
db.on("error", function () {
	console.log("Connection Failed!");
});
//* 연결 성공
db.once("open", function () {
	console.log("Connected!");
});

//* Schema 생성
var users = new mongoose.Schema({
	nickname: {
		type: String,
		required: "true",
		trim: "true",
	},
	email: {
		type: String,
		required: "true",
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
		trim: "true",
	},
	password: {
		type: String,
		required: "true",
		trim: "true",
	},
	avatar: "string",
});

var schedule = new mongoose.Schema({
	thumbnail: [{ img: "string", _id: false }],
	scheduleTitle: {
		type: String,
		required: true,
	},
	hashtag: [
		{ tagName: { type: String, required: true, trim: true }, _id: false },
	],
	best: {
		type: Number,
		default: 0,
	},
	worst: {
		type: Number,
		default: 0,
	},
	detail: [
		{
			detailTitle: {
				type: String,
				required: true,
			},
			comment: "string",
			time: {
				type: String,
				required: true,
			},
			place: "string",
			position: {
				type: String,
				required: true,
			},
		},
	],
	bookmark: {
		type: Boolean,
		default: false,
	},
	userInfo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

const usersModel = mongoose.model("user", users);
const scheduleModel = mongoose.model("schedule", schedule);

//! 회원 정보추가 샘플
// const newUser = new usersModel({
// 	nickname: "psh1111",
// 	email: "psh@i.com",
// 	password: "1234",
// });

//! 스케줄 추가 샘플
// const newSchedule = new scheduleModel({
// 	thumbnail: [{ img: "food1.jpg" }, { img: "food2.jpg" }],
// 	scheduleTitle: "역시 한식이 쵝오야",
// 	hashtag: [{ tagName: "#서울" }, { tagName: "#맛집" }],
// 	detail: [
// 		{
// 			detailTitle: "잘 되어있니???",
// 			comment: "철수랑 한솥데이트",
// 			time: "13:30",
// 			place: "한솥 서울지점",
// 			position: "점심",
// 		},
// 	],
// 	nickname: "6035b635c3b5c3a3d57b0d8d",
// });

//! 회원 정보 추가한것 DB에 저장
// newUser.save(function (err, data) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Saved user!");
// 		console.log(data);
// 	}
// });

//! 스케줄 정보 추가한것 DB에 저장
// newSchedule.save(function (error) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log("Saved schedule!");
// 	}
// });

//! 특정 회원을 찾은 뒤에 변경한 내용 DB에 업데이트 하기
// usersModel.find({ nickname: "psh" }, (err, data) => {
// 	console.log("이것이 너가 찾던거");
// 	console.log(data);
// 	// for (let i of data) {
// 	// 	i.nickname = "adminWow";
// 	// 	i.save();
// 	// }
// });

//! scheduleModel에서 usersModel에서 참조한 정보가 제대로 불러오는지 확인
// scheduleModel
// 	.findOne({ nickname: "6035b635c3b5c3a3d57b0d8d" })
// 	.populate("nickname")
// 	.exec((err, data) => {
// 		let result = {
// 			nickname: data.userInfo.nickname,
// 			email: data.userInfo.email,
// 		};
// 		console.log(result);
// 	});

//! 특정 data값 불러와서 삭제하기
// usersModel.deleteMany({ nickname: "psh" }, (err, data) => {
// 	console.log(data);
// });
