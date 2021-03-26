const express = require("express");
const router = express.Router();
const auth = require("./auth");
const { upload } = require("./multer");

const {
	oneSchedule,
	bookmark,
	bestworst,
	modify,
	save,
} = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", auth, bookmark.post);
//* GET /schedule/:scheduleid
router.get("/:scheduleid", oneSchedule.get);
//* PATCH /schedule/bestworst/:scheduleid
router.post("/bestworst/:scheduleid", auth, bestworst.post);
//* PUT /schedule/modify/:scheduleid
router.put("/modify/:scheduleid", auth, upload.single("img"), modify.put);
//* POST /schedule/save
router.post("/save", auth, upload.single("img"), save.post);

module.exports = router;
