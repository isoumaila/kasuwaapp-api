var express = require('express');
var router = express.Router();
const ctrlAbout = require('../controllers/aboutController');


/* Other pages */
router.get('/about', ctrlAbout.about);

module.exports = router;