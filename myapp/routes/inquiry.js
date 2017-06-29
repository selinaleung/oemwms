var express = require('express');
var router = express.Router();

var validator = require('validator');

var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

router.post('/add', function(req, res) {
	console.log(req.body);
	var customerId = req.body.customer_id;
	if (!req.body.issue) {
		res.render('error', {'message': 'Invalid issue', 'status': 500});
	} else {
		Inquiry.createInquiry(customerId, req.body.issue, req.body.solution, req.body.notes, validator.escape(validator.toInt(req.body.order_num)), function (err, inquiry) {
			if (err) {
				callback(err);
			} else {
				res.redirect('/customer/' + customerId);
			}
		})
	};
});

module.exports = router;