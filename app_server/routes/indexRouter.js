var express = require('express');
var router = express.Router();
const ctrlAccueil = require('../controllers/accueilController');
const auth = require("../../middleware/auth");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* Other pages */
router.get('/', auth, urlencodedParser, ctrlAccueil.accueil);

module.exports = router;