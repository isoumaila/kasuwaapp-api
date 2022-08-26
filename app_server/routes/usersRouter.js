var express = require('express');
var router = express.Router();
const ctrlUsers = require('../controllers/usersController');
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/* Other pages */
router.get('/auth/loginget', ctrlUsers.loginGet);
router.post('/auth/login', urlencodedParser, ctrlUsers.loginPost);
router.post('/auth/logout', urlencodedParser, ctrlUsers.logout);
router.get('/auth/register', urlencodedParser, ctrlUsers.registerGet);
router.post('/auth/register', urlencodedParser, ctrlUsers.registerPost)

module.exports = router;