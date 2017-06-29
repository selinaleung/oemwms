var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Inquiry = require('../models/Inquiry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OEM WMS' });
});

module.exports = router;
