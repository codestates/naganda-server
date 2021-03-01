const express = require("express");
const router = express.Router();
const { upload } = require('./multer');

const { oneSchedule, bookmark, bestworst, modify, save } = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", bookmark.post);
//* GET /schedule/:scheduleid
router.get("/:scheduleid", oneSchedule.get);
//* PATCH /schedule/bestworst/:scheduleid
router.post("/bestworst/:scheduleid", bestworst.post);
//* PUT /schedule/modify/:scheduleid
router.put("/modify/:scheduleid", upload.array('img', 3), modify.put);
//* POST /schedule/save
router.post("/save", upload.array('img', 3), save.post);

module.exports = router;
