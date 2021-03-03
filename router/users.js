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
//* GET /users/myinfo
router.get("/myinfo", auth, myInformation.get);
//* GET /users/schedules
router.get("/schedules/", auth, myScheduleInfo.get);
//* DELETE /users/removeSchedules/:scheduleid
router.delete("/removeSchedules/:scheduleid", auth, removeSchedule.delete);
//* DELETE /users/delete
router.delete("/delete", auth, unregister.delete);
//* POST /users/logout
router.post("/logout", auth, guestLogout.post);
//* PATCH /users/updateUserinfo
router.patch(
	"/updateUserinfo",
	auth,
	upload.single("img"),
	updateUserInfo.patch
);

module.exports = router;
