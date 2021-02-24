const express = require("express");
const app = express();
//const http = require("http");
const port = 4000;

app.get("/", (req, res) => {
	res.send("plzzzzzzzzz");
});

app.listen(port, () => {
	console.log("Example app listening at http://localhost:${port}");
});
