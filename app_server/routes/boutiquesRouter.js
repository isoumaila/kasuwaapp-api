var express = require('express');
var router = express.Router();
const ctrlBoutique = require('../controllers/boutiquesController');
var bodyParser = require('body-parser')
const auth = require("../../middleware/auth");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* Other pages */
router.get('/boutiques', auth, ctrlBoutique.boutiques);
router.get('/boutiques/one', auth, ctrlBoutique.oneBoutique);
router.get('/boutiques/one/mod', auth, ctrlBoutique.oneBoutiqueModGet);
router.post('/boutiques/one/mod', auth, urlencodedParser, ctrlBoutique.oneBoutiqueModPost);
router.get('/boutiques/one/add', auth, ctrlBoutique.boutiquesAddGet);
router.post('/boutiques/one/add', auth, urlencodedParser, ctrlBoutique.boutiquesAdd);
router.get('/boutiques/one/delete', auth, ctrlBoutique.oneBoutiqueDelete);


module.exports = router;