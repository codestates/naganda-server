const express = require("express");
const router = express.Router();

const { oneSchedule, bookmark } = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", bookmark.post);
//* GET /schedule/:scheduleid
router.get("/:scheduleid", oneSchedule.get);

module.exports = router;
