var express = require('express');
var router = express.Router();
var validator = require('validator');
var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');
var moment = require('moment');

router.post('/add', function(req, res) {
	var timeCreated = moment().format('MM/DD h:mm a');
	var customerId = req.body.customer_id;
	if (!req.body.issue) {
		res.render('error', {'message': 'Invalid issue', 'status': 500});
	} else {
		Inquiry.createInquiry(customerId, timeCreated, req.session.user, req.body.issue, req.body.solution, req.body.notes, req.body.order_num, req.body.resolved, function (err, inquiry) {
			if (err) {
				callback(err);
			} else {
				res.redirect('/customer/' + customerId);
			}
		})
	};
});

router.post('/update', function(req, res) {
	var time = moment().format('MM/DD h:mm a');
	Inquiry.updateInquiry(req.body.inquiry_id, req.session.user, req.body.notes, time, req.body.status, function (err, inquiry) {
		if (err){
			callback(err);
		} else {
			res.redirect('/customer/' + req.body.customer_id)
		}
	})
})

module.exports = router;