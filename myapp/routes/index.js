var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res) {
	res.render('customer_search');
}); 

router.get('/login', function(req, res) {
	res.render('customer_search');
})

module.exports = router;
