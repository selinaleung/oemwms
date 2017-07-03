var mongoose = require('mongoose');
var schemas = require('./schemas');
var customerModel = schemas.customerModel;
var inquiryModel = schemas.inquiryModel;
var ObjectId = mongoose.Types.ObjectId;
var Customer = require('./Customer');
var moment = require('moment');

var Inquiry = (function Inquiry() {
	var that = Object.create(Inquiry.prototype);

	that.createInquiry = function(customerId, timeCreated, issue, solution, notes, order_num, status, callback) {
		var resolved = status == 'on' ? 'resolved' : 'unresolved';
		inquiryModel.create({
			customer: customerId,
			created: timeCreated,
			issue: issue,
			solution: solution,
			notes: notes,
			order_num: order_num,
			status: resolved
		}, function (err, inquiry) {
			if (err) {
				callback(err);
			} else {
				Customer.addInquiry(customerId, inquiry, function(err, customer){
					if (err){
						callback(err);
					} else {
						callback(null, inquiry);
					}
				})
			}
		});
	}

	that.updateInquiry = function(inquiryId, notes, status, callback) {
		inquiryModel.findByIdAndUpdate(inquiryId, { $set: {notes: notes, status: status } }, {new: true}, function (err, inquiry){
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