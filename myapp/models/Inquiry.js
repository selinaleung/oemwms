var mongoose = require('mongoose');
var schemas = require('./schemas');
var customerModel = schemas.customerModel;
var inquiryModel = schemas.inquiryModel;
var ObjectId = mongoose.Types.ObjectId;
var Customer = require('./Customer');
var User = require('./User');
var moment = require('moment');

var Inquiry = (function Inquiry() {
	var that = Object.create(Inquiry.prototype);

	that.createInquiry = function(customer_id, time_created, created_by, issue, solution, notes, order_num, status, callback) {
		var resolved = status == 'on' ? 'resolved' : 'unresolved';
		var created_by_name = created_by.name.toLowerCase().split(' ').map(function(word) {
			return word[0].toUpperCase()+word.substr(1);
		}).join(' ');
		inquiryModel.create({
			customer: customer_id,
			created_on: time_created,
			created_by: created_by_name, 
			issue: issue,
			solution: solution,
			notes: notes,
			order_num: order_num,
			status: resolved
		}, function (err, inquiry) {
			if (err) {
				callback(err);
			} else {
				Customer.addInquiry(customer_id, inquiry, function(err, customer){
					if (err){
						callback(err);
					} else {
						User.addInquiry(created_by._id, inquiry, function(err, user){
							if (err) {
								callback(err);
							} else {
								callback(null, inquiry);
							}
						});
					}
				});
			}
		});
	}

	that.updateInquiry = function(inquiry_id, notes, status, callback) {
		inquiryModel.findByIdAndUpdate(inquiry_id, { $set: {notes: notes, status: status } }, {new: true}, function (err, inquiry){
			if (err) {
				callback(err);
			} else {
				callback(null, inquiry);
			}
		})
	}
	Object.freeze(that);
	return that;
})();

module.exports = Inquiry;