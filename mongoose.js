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
// 	nickname: "게스트",
// 	email: "guest@i.com",
// 	password: "1234",
// });

//! 스케줄 추가 샘플
// const newSchedule = new scheduleModel({
// 	thumbnail: [{ img: "food1.jpg" }, { img: "food2.jpg" }],
// 	scheduleTitle: "역시 일식이 쵝오야",
// 	hashtag: ["#서울", "#맛집"],
// 	bestWorst: [{ userInfo: "603864d9c564694e21a4e6bb", best: 0, worst: 1 }],
// 	detail: [
// 		{
// 			detailTitle: "잘 되어있니???",
// 			comment: "철수랑 한솥데이트",
// 			time: "13:30",
// 			place: "한솥 서울지점",
// 			position: "점심",
// 		},
// 	],
// 	userInfo: "6039ceed58ba2e1e4ef4f3a1",
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
// scheduleModel.deleteMany({ _id: "603879c3d1d0a662bc6d42d8" }, (err, data) => {
// 	console.log(data);
// });

// usersModel
// 	.updateOne({ _id: "60370965f3382619ed31c4d4" }, { nickname: "김동동" })
// 	.then((data) => {
// 		console.log(data);
// 	});

//scheduleModel.updateMany({}, { $pull: { bestWorst: {userInfo: } } });
