'use strict';
const express = require('express');
const router = express.Router();

const controller = require("./controller");

// module.exports = function (app) {
router.get('/about', controller.about);
router.post('/add-location', controller.addLocation);
router.get('/get-location', controller.fetchLocation);
// };

module.exports = router;