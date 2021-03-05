const mongoose = require("mongoose");

var users = new mongoose.Schema({
	nickname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
	},
	avatar: "string",
	refreshToken: {
		type: String,
	},
});

module.exports = mongoose.model("user", users);
