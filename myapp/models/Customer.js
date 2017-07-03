var mongoose = require('mongoose');
var schemas = require('./schemas');
var customerModel = schemas.customerModel;
var inquiryModel = schemas.inquiryModel;
var ObjectId = mongoose.Types.ObjectId;

var Customer = (function Customer() {
	var that = Object.create(Customer.prototype);

	// add a new customer to the database
	that.createCustomer = function(name, phone, email, callback) {
		customerModel.create({
			'name': name,
			'phone': phone,
			'email': email,
			'inquiries': []
		}, function (err, customer) {
			if (err) {
				callback(err);
			} else {
				callback(null,customer);
			}
		});
	};


	that.getCustomer = function(customerId, callback) {
		customerModel.findById(customerId, function (err, customer) {
			if (err){
				callback(err, null)
			} else{
				callback(null, customer);
			}
		});
	};

	// Checks to see if the given input corresponds to an existing customer
	// returns the customer object if found
	that.existsCustomer = function(customer_info, callback) {
		customerModel.findOne(customer_info, function (err, customer) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, customer);
			}
		});
	};

	that.addInquiry = function(customerId, inquiry, callback) {
		customerModel.findByIdAndUpdate(customerId, { $push: {inquiries: inquiry} }, function (err) {
			if (err) {
				callback(err);
			} else {
				console.log(inquiry)
				callback(null, inquiry);
			}
		});
	};

	// Given that the customer exists, return the inquiries 
	that.getInquiries = function(customerId, callback) {
		customerModel.findById(customerId, function (err, customer) {
			if (err) {
				callback(err);
			} else if (!customer) {
				callback({ msg: 'Invalid user' });
			} else {
				if (customer.inquiries.length) {
					inquiryModel.find({ '_id' : { $in: customer.inquiries } }, 
						function (err, inquiries) {
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
	Object.freeze(that);
	return that;
})();

module.exports = Customer;