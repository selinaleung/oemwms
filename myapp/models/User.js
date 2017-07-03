var mongoose = require('mongoose');
var schemas = require('./schemas');
var customerModel = schemas.customerModel;
var inquiryModel = schemas.inquiryModel;
var userModel = schemas.userModel;
var ObjectId = mongoose.Types.ObjectId;

var User = (function User() {
	var that = Object.create(User.prototype);

	that.createUser = function(username, name, password, callback) {
		console.log(username, name, password)
		userModel.count( {username: username}, function (err, count) {
			if (username === "" || count > 0) {
				callback(err);
			} else {
				userModel.create({
					'username': username,
					'name': name,
					'password': password,
					'inquiries': []
				}, function (err, user) {
					if (err){
						console.log(err);
						callback(err);
					} else {
						console.log(user);
						callback(null, user);
					};
				});
			};
		});
	};

	that.login = function (username, password, callback) {
		userModel.findOne({ 'username': username }, function (err, user) {
			if (err) {
				callback(err);
			} else if (!user) {
				callback({error_msg: 'Username not found'});
			} else {
				user.comparePassword(password, function (err, matches) {
					if (err) {
						callback(err);
					} else {
						if (matches) {
							callback(null, user);
						} else{
							callback(null, false);
						}
					}
				})
			}
		})
	}

	that.addInquiry = function(inquiryId, callback) {
		userModel.findByIdAndUpdate(customerId, { $push: {inquiries: inquiry} }, function (err) {
			if (err) {
				callback(err);
			} else {
				callback(null, inquiry);
			}
		});
	}

	Object.freeze(that);
	return that;
})();

module.exports = User;