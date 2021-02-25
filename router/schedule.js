const express = require("express");
const router = express.Router();

const { bookmark } = require("../controllers/schedule");

//* POST /schedule/bookmark/:scheduleid
router.post("/bookmark/:scheduleid", bookmark.post);

module.exports = router;
