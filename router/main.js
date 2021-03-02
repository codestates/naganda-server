const express = require("express");
const router = express.Router();

const { top4, search } = require("../controllers/main");

//* GET /main/top4
router.get("/top4", top4.get);
//* GET /main/search
router.get("/search", search.get);

module.exports = router;
