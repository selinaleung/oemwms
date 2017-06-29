var mongoose = require('mongoose');
var schemas = require('./schemas');
var customerModel = schemas.customerModel;
var inquiryModel = schemas.inquiryModel;
var ObjectId = mongoose.Types.ObjectId;

var Customer = (function Customer() {
	var that = Object.create(Customer.prototype);

	// Checks to see if the given input corresponds to an existing customer
	// returns the customer object if found
	that.existsCustomer = function(name, phone, email, callback) {
		customerModel.find({'name': name, 'phone': phone, 'email': email}, function(err, customer) {
			if (err) {
				console.log('err');
				callback(err, null);
			} else {
				callback(null, customer);
			};
		});
	};


	// Given that the customer exists, return the inquiries 
	that.getInquiries = function(customerId, callback) {
		customerModel.findById(customerId, function (err, user) {
			if (err) {
				callback(err);
			} else if (!user) {
				callback({ msg: 'Invalid user' });
			} else {
				if (user.inquiries.length) {
					inquiryModel.find({ '_id' : { $in: user.rides } }, 
						function (err, rides) {
							if (err) {
								callback(err);
							} else {
								callback(null, inquiries);
							}
						});
				} else {
					callback(null, []);
				};
			};
		});
	};
});

module.exports = Customer;