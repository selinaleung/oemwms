var mongoose = require('mongoose');

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

module.exports = {
	inquiryModel: mongoose.model('Inquiry', inquirySchema),
	customerModel: mongoose.model('Customer', customerSchema)
};