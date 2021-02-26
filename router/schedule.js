const express = require("express");
const router = express.Router();

const { oneSchedule, bookmark, bestworst } = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", bookmark.post);
//* GET /schedule/:scheduleid
router.get("/:scheduleid", oneSchedule.get);
//* PATCH /schedule/bestworst/:scheduleid
router.post("/bestworst/:scheduleid", bestworst.post);

module.exports = router;
