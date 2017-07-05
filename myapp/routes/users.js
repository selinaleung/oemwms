var express = require('express');
var router = express.Router();
var validator = require('validator');
var User = require('../models/User');
var Inquiry = require('../models/Inquiry');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.getInquiries(req.session.user._id, function (err, inquiries) {
		if (err) {
			res.redirect('/');
		} else {
			res.render('user', {'csrf': req.csrfToken(), 'inquiries': inquiries, 'user': req.session.user});
		}
	})
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	User.login(username, password, function (err, user) {
		if (!user){
			res.render('login', {'csrf': req.csrfToken(), 'error': 'That login is incorrect' })
		} else {
			req.session.user = user;
			res.redirect('/home');
		}
	})
})

router.post('/register', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name;
	User.createUser(username, name, password, function (err, user) {
		if (!user){
			res.render('register', {'csrf': req.csrfToken(), 'error': 'User not registered' })
		} else{
			res.redirect('/');
		}
	}) 
})
module.exports = router;
