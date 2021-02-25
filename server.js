const mongoose = require("mongoose");
const express = require("express");
const mainRouter = require("./router/main");
const usersRouter = require("./router/users");
const bodyParser = require("body-parser");
const app = express();

//const http = require("http");
const port = 4000;

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

app.use(bodyParser.json());

app.use("/main", mainRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
