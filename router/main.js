const express = require('express');
const router = express.Router();

const { top4 } = require('../controllers/main');

//* GET /main/top4
router.get('/top4', top4.get);

module.exports = router;