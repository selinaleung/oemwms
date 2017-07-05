var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login' , { 'csrf': req.csrfToken() });
});

router.post('/home', function(req, res) {
	res.render('index');
}); 

router.get('/home', function(req, res) {
	var user = req.session.user;
	res.render('index', { 'csrf': req.csrfToken(), 'user': user });
})

router.get('/register', function(req, res) {
	res.render('register',  { 'csrf': req.csrfToken() });
})

module.exports = router;
