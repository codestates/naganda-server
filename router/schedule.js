const express = require("express");
const router = express.Router();
const auth = require("./auth");
const { upload } = require("./multer");

const {
	oneSchedule,
	bookmark,
	bestworst,
	modifyHead,
	modifyBody,
	saveHead,
	saveBody,
} = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", auth, bookmark.post);
//* GET /schedule/:scheduleid
router.get("/:scheduleid", oneSchedule.get);
//* PATCH /schedule/bestworst/:scheduleid
router.post("/bestworst/:scheduleid", auth, bestworst.post);
//* PUT /schedule/modifyHead/:scheduleid
router.put(
	"/modifyHead/:scheduleid",
	auth,
	upload.single("img"),
	modifyHead.put
);
//* PUT /schedule/modifyBody/:scheduleid
router.put("/modifybody/:scheduleid", auth, modifyBody.put);
//* POST /schedule/saveHead
router.post("/saveHead", auth, upload.single("img"), saveHead.post);
//* POST /schedule/saveBody
router.post("/saveBody", auth, saveBody.post);

module.exports = router;

/**
 * 1. modifyHead
 * 2. modifyBody
 * 3. saveHead
 * 4. saveBody
 */
