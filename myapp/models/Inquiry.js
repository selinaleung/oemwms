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

	that.createInquiry = function(customer_id, time_created, user, issue, solution, notes, order_num, status, callback) {
		var resolved = status == 'on' ? 'resolved' : 'unresolved';
		var inqling = { 'user': user.username, 'time': time_created, 'note': notes };
		inquiryModel.create({
			customer: customer_id,
			created_on: time_created,
			inqlings: [inqling],
			issue: issue,
			solution: solution,
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
						User.addInquiry(user._id, inquiry, function(err, user){
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

	that.updateInquiry = function(inquiry_id, user, notes, time, status, callback) {
		var inqling = { 'user': user.username, 'time': time, 'note': notes };
		inquiryModel.findByIdAndUpdate(inquiry_id, { $set: {notes: notes, status: status }, $push: {inqlings: inqling} }, {'new': true, 'multi': true}, function (err, inquiry){
			if (err) {
				callback(err);
			} else {
				User.addInquiry(user._id, inquiry, function(err, user){
					if (err) {
						callback(err);
					} else {
						callback(null, inquiry);
					}
				});
			}
		})
	}
	Object.freeze(that);
	return that;
})();

module.exports = Inquiry;