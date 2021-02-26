const express = require("express");
const router = express.Router();

const {
	oneSchedule,
	bookmark,
	modify,
	save,
} = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", bookmark.post);
//* GET /schedule/:scheduleid
router.get("/:scheduleid", oneSchedule.get);
//* PUT /schedule/modify/:scheduleid
router.put("/modify/:scheduleid", modify.put);
//* POST /schedule/save
router.post("/save", save.post);

module.exports = router;
