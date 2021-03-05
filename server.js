const mongoose = require("mongoose");
const express = require("express");
const mainRouter = require("./router/main");
const usersRouter = require("./router/users");
const scheduleRouter = require("./router/schedule");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
//const http = require("http");
const port = 4000;
const atlas = process.env.ATLAS_URI;

mongoose.connect(atlas, {
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
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(bodyParser.json());

app.use("/main", mainRouter);
app.use("/users", usersRouter);
app.use("/schedule", scheduleRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
