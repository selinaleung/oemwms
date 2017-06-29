var express = require('express');
var router = express.Router();

var validator = require('validator');

var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

//Using any input in search to look in database
router.post('/find', function(req, res) {
	var customer_info = { }
	for (attr in req.body) {
		if (req.body[attr]) { 
			customer_info[attr] = req.body[attr] 
		};
	}
	Customer.existsCustomer(customer_info, function (err, customer) {
		if (err) {
			res.render('error', { 'message': 'User does not exist', 'status': 500});
		} else{
			res.redirect('/customer/' + customer._id);
		};
	});
});

// Use customer ID to get customer's previous inquiries
router.get('/:customer', function (req, res) {
	var customerId = req.params.customer;
	Customer.getInquiries(customerId, function (err, inquiries) {
		if (err) {
			res.render('error', { 'message': 'Resource not found.', 'status': 500 });
		} else {
			res.render('inquiries', { title: "customer page", inquiries: inquiries, customer_id: customerId});
		};
	});
});

// Create a new customer
router.post('/create', function(req, res) {
	Customer.createCustomer(req.body.name, req.body.phone, req.body.email, function (err, customer) {
		if (err){
			callback(err)
		} else {
			res.redirect('/customer/' + customer._id);
		}
	})
})

module.exports = router;