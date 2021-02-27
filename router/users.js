const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/main");
const {
	myInformation,
	myScheduleInfo,
	removeSchedule,
	unregister,
	guestLogout,
} = require("../controllers/mypage");

//* POST /users/signup
router.post("/signup", signup.post);
//* GET /users/:userid
router.get("/:userid", myInformation.get);
//* GET /users/schedules/:userid
router.get("/schedules/:userid", myScheduleInfo.get);
//* DELETE /users/removeSchedules/:scheduleid
router.delete("/removeSchedules/:scheduleid", removeSchedule.delete);
//* DELETE /users/delete/:userid
router.delete("/delete/:userid", unregister.delete);
//* POST /users/logout/:userid
router.post("/logout/:userid", guestLogout.post);

module.exports = router;
