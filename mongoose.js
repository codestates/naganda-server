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
	hashtag: [{ type: String, required: true, trim: true, _id: false }],
	bestWorst: [
		{
			userInfo: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
			best: {
				type: Number,
			},
			worst: {
				type: Number,
			},
			_id: false,
		},
	],
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
// 	nickname: "테스트씨",
// 	email: "test@i.com",
// 	password: "1234",
// });

//! 스케줄 추가 샘플
const newSchedule = new scheduleModel({
	thumbnail: [{ img: "food1.jpg" }, { img: "food2.jpg" }],
	scheduleTitle: "이씨이씨이씨이씨",
	hashtag: ["#서울", "#장소"],
	bestWorst: [
		{ userInfo: "6038abd9d1743a16adc10d9b", best: 0, worst: 1 },
		{ userInfo: "60389dccf1c78713886f8d35", best: 1, worst: 0 },
	],
	detail: [
		{
			detailTitle: "testtest",
			comment: "testtest",
			time: "15:00",
			place: "test",
			position: "점심",
		},
	],
	userInfo: "60389dbc19e9c1137bfb4b86",
});

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
newSchedule.save(function (error) {
	if (error) {
		console.log(error);
	} else {
		console.log("Saved schedule!");
	}
});

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
// scheduleModel.deleteMany({ userInfo: "6035b635c3b5c3a3d57b0d8d" }, (err, data) => {
// 	console.log(data);
// });

// usersModel
// 	.updateOne({ _id: "60370965f3382619ed31c4d4" }, { nickname: "김동동" })
// 	.then((data) => {
// 		console.log(data);
// 	});

//scheduleModel.updateMany({}, { $pull: { bestWorst: {userInfo: } } });
