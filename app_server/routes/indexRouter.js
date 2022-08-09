var express = require('express');
var router = express.Router();
const ctrlAccueil = require('../controllers/accueilController');


/* Other pages */
router.get('/', ctrlAccueil.accueil);

module.exports = router;