const mongoose = require("mongoose");

var schedule = new mongoose.Schema({
	thumbnail: [{ img: "string", _id: false }],
	scheduleTitle: {
		type: String,
		required: true,
	},
	hashtag: [{type: String, required: true, trim: true, _id: false}],
	bestWorst: [{
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
		_id: false
	}],
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

module.exports = mongoose.model("schedule", schedule);