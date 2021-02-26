const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/main");
const { myInformation, myScheduleInfo, removeSchedule } = require("../controllers/mypage");

//* POST /users/signup
router.post("/signup", signup.post);
//* GET /users/:nickname
router.get("/:nickname", myInformation.get);
//* GET /users/schedules/:userid
router.get("/schedules/:userid", myScheduleInfo.get);
//* DELETE /users/removeSchedules/:scheduleid
router.delete("/removeSchedules/:scheduleid", removeSchedule.delete);

module.exports = router;
