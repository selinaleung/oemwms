var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res) {
	if (!req.session.user) {
    	res.render('login', {'error': 'You must be logged in to see this page'});
  	} else {
		var user = req.session.user;
		res.render('index', { 'user': user });
	}
})

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	res.render('login');
})

router.get('/register', function(req, res) {
	res.render('register');
})

module.exports = router;
