const express = require("express");
const router = express.Router();
const auth = require("./auth");
const { upload } = require("./multer");

const { login, guestLogin } = require("../controllers/login");
const { signup } = require("../controllers/main");
const {
	myInformation,
	myScheduleInfo,
	removeSchedule,
	unregister,
	guestLogout,
	updateUserInfo,
} = require("../controllers/mypage");

//* POST /users/login
router.post("/login", login.post);
//* POST /users/guest
router.post("/guest", guestLogin.post);
//* POST /users/signup
router.post("/signup", signup.post);
//* GET /users/:userid
router.get("/:userid", auth, myInformation.get);
//* GET /users/schedules/:userid
router.get("/schedules/:userid", auth, myScheduleInfo.get);
//* DELETE /users/removeSchedules/:scheduleid
router.delete("/removeSchedules/:scheduleid", auth, removeSchedule.delete);
//* DELETE /users/delete/:userid
router.delete("/delete/:userid", auth, unregister.delete);
//* POST /users/logout/:userid
router.post("/logout/:userid", auth, guestLogout.post);
//* PATCH /users/updateUserinfo/:userid
router.patch(
	"/updateUserinfo/:userid",
	auth,
	upload.single("img"),
	updateUserInfo.patch
);

module.exports = router;
