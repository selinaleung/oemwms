var mongoose = require('mongoose');
var schemas = require('./schemas');
var customerModel = schemas.customerModel;
var inquiryModel = schemas.inquiryModel;
var ObjectId = mongoose.Types.ObjectId;
var Customer = require('./Customer');
var moment = require('moment');

var Inquiry = (function Inquiry() {
	var that = Object.create(Inquiry.prototype);

	that.createInquiry = function(customerId, timeCreated, issue, solution, notes, order_num, callback) {
		console.log(timeCreated);
		inquiryModel.create({
			customer: customerId,
			created: timeCreated,
			issue: issue,
			solution: solution,
			notes: notes,
			order_num: order_num
		}, function (err, inquiry) {
			if (err) {
				console.log(inquiry);
				callback(err);
			} else {
				console.log(inquiry);
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
	Object.freeze(that);
	return that;
})();

module.exports = Inquiry;