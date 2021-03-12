const express = require("express");
const router = express.Router();

const { top4, search } = require("../controllers/main");

//* GET /main/top4
router.get("/top4", top4.get);
//* POST /main/search
router.post("/search", search.post);

module.exports = router;
