var express = require('express');
var router = express.Router();
const ctrlBoutique = require('../controllers/boutiquesController');
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* Other pages */
router.get('/boutiques', ctrlBoutique.boutiques);
router.get('/boutiques/one', ctrlBoutique.oneBoutique);
router.get('/boutiques/one/mod', ctrlBoutique.oneBoutiqueModGet);
router.post('/boutiques/one/mod', urlencodedParser, ctrlBoutique.oneBoutiqueModPost);
router.get('/boutiques/one/add', ctrlBoutique.boutiquesAddGet);
router.post('/boutiques/one/add', urlencodedParser, ctrlBoutique.boutiquesAdd);
router.get('/boutiques/one/delete', ctrlBoutique.oneBoutiqueDelete);


module.exports = router;