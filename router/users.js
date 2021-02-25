const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/main");

//* POST /users/signup
router.post("/signup", signup.post);

module.exports = router;
