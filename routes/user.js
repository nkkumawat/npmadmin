var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var tables = require('../database/tables.json');
	console.log(tables);
  	res.render('index', { tables: tables });
});

module.exports = router;
