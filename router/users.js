const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/main");
const { myInformation, unregister } = require("../controllers/mypage");

//* POST /users/signup
router.post("/signup", signup.post);
//* GET /users/:userid
router.get("/:userid", myInformation.get);
//* DELETE /users/delete/:userid
router.delete("/delete/:userid", unregister.delete);

module.exports = router;
