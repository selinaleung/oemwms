var express = require('express');
var router = express.Router();

var validator = require('validator');

var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*
//may not need this function, do some investage
router.get('/:customer', function(req, res) {
	Customer.getInquiries(req.params.customer, function (err, inquiries) {
		if (err) {
			res.render('error', { 'message': 'Resource not found.', 'status': 404 });
		} else {
			res.render('inquiries', { 'inquiries': inquiries});
		}
	});
});

*/

//using the form input, find the customer and show all past inquiries

router.post('/find', function(req, res) {
	Customer.existsCustomer(req.body.name, req.body.phone, req.body.email, function (err, customer) {
		if (err) {
			res.render('error', { 'message': 'User does not exist', 'status': 500});
		} else{
			res.redirect('/');
		};
	});
});
/*
router.get('/', function(req, res) {
	res.render('index', { title: "OEM" });
})
*/
router.get('/:customer', function (req, res) {
	Customer.getInquiries(req.params.customer, function (err, inquiries) {
		if (err) {
			res.render('error', { 'message': 'Resource not found.', 'status': 500 });
		} else {
			res.render('inquiries', { 'inquiries': inquiries });
		};
	});
});

router.post('/add', function(req, res) {
	var customerId = req.body.customer_id;
	var now = new Date();
	if (!req.body.issue) {
		res.render('error', {'message': 'Invalid issue', 'status': 500});
	} else {
		Customer.addInquiry(customerId, now, validator.escape(validator.toString(req.body.issue)), validator.escape(validator.toString(req.body.solution)), validator.escape(validator.toString(req.body.notes)), validator.escape(validator.toInt(req.body.order_num)))
	};
});

module.exports = router;