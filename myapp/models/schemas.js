var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var inquirySchema = new Schema({
	customer: { type: ObjectId, ref: 'customerSchema'},
	created: { type: String, required: true },
	issue: { type: String, required: true },
	solution: String,
	notes: String,
	order_num: Number,
	status: { type: String, default: 'unresolved' }
})

var customerSchema = new Schema({
	name: { type: String, required: true },
	phone: { type: Number, required: true },
	email: { type: String },
	inquiries: [{ type: ObjectId, ref: 'inquirySchema' }]
})

var userSchema = new Schema({
	name: { type: String, required: true},
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String },
	inquiries: [{ type: ObjectId, ref: 'inquirySchema' }]
})

userSchema.pre('save', function (next) {
	var user = this;
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
})

userSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, function (err, matches) {
		if (err) return cb(err, false);
		cb(null, matches);
	})
}

module.exports = {
	inquiryModel: mongoose.model('Inquiry', inquirySchema),
	customerModel: mongoose.model('Customer', customerSchema),
	userModel: mongoose.model('User', userSchema)
};