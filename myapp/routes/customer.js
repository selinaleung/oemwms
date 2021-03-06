var express = require('express');
var router = express.Router();

var moment = require('moment');

var validator = require('validator');

var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

var isLoggedIn = function(req, res, next) {
  if (!req.session.user) {
    res.render('login', {'error': 'You must be logged in to see this page'});
  } else {
    next();
  }
};

router.all('*', isLoggedIn);

//Using any input in search to look in database
router.post('/find', function(req, res) {
	var customer_info = { }
	for (attr in req.body) {
		if (attr != "_csrf"){
			if (req.body[attr]) { 
				customer_info[attr] = req.body[attr] 
			};
		}
	}
	Customer.existsCustomer(customer_info, function (err, customer) {
		if (err) {
			res.render('error', { 'message': 'Improper Search', 'status': 500});
		} else if (!customer) {
			res.render( 'index', { 'error_msg': "User does not exist", 'user': req.session.user } );
		} else{
			res.redirect('/customer/' + customer._id);
		};
	});
});

// Use customer ID to get customer's previous inquiries
router.get('/:customer', function (req, res) {
	var customerId = req.params.customer;
	Customer.getCustomer(customerId, function (err, customer) {
		if (err) {
			callback(err);
		} else { 
			Customer.getInquiries(customerId, function (err, inquiries) {
				if (err) {
					res.render('error', { 'message': 'Resource not found.', 'status': 500 });
				} else {
					res.render('customer', { 'customer': customer, 'inquiries': inquiries, 'user': req.session.user });
				};
			});
		}
	})
	
});

// Create a new customer
router.post('/create', function(req, res) {
	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;
	if (!name || !phone || !email){
		res.render('index', { error_msg: 'Fill in all fields to create a new customer.', 'user': req.session.user})
	} else if (phone.length != 10) {
		res.render('index', { error_msg: 'The phone number you provided is not 10 digits long.', 'user': req.session.user})
	} else {
		Customer.createCustomer(req.body.name, req.body.phone, req.body.email, function (err, customer) {
			if (err){
				callback(err)
			} else {
				res.redirect('/customer/' + customer._id);
			}
		})
	}
})

module.exports = router;