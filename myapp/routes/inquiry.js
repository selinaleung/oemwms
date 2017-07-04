var express = require('express');
var router = express.Router();
var validator = require('validator');
var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');
var moment = require('moment');

router.post('/add', function(req, res) {
	var timeCreated = moment().format('MM/DD/YY h:mm a');
	var customerId = req.body.customer_id;
	console.log(req.session.user.name);
	if (!req.body.issue) {
		res.render('error', {'message': 'Invalid issue', 'status': 500});
	} else {
		Inquiry.createInquiry(customerId, timeCreated, req.body.issue, req.body.solution, req.body.notes, req.body.order_num, req.body.resolved, function (err, inquiry) {
			if (err) {
				callback(err);
			} else {
				res.redirect('/customer/' + customerId);
			}
		})
	};
});

router.post('/update', function(req, res) {
	Inquiry.updateInquiry(req.body.inquiry_id, req.body.notes, req.body.status, req.session.user, function (err, inquiry) {
		if (err){
			callback(err);
		} else {
			res.redirect('/customer/' + req.body.customer_id)
		}
	})
})

module.exports = router;