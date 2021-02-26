const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/main");
const { myInformation, myScheduleInfo } = require("../controllers/mypage");

//* POST /users/signup
router.post("/signup", signup.post);
//* GET /users/:nickname
router.get("/:nickname", myInformation.get);
//* GET /users/schedules/:userid
router.get("/schedules/:userid", myScheduleInfo.get);

module.exports = router;
