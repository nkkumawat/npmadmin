var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	var tables = require('../database/tables.json');
  	res.render('index', { tables: tables });
});

router.get('/show', function(req, res, next) {
	var tableName = req.query.table;
	var range = req.query.range;
	console.log(range);
	var tablesDesc = require('../database/'+tableName+'.json');	
	var connection = require('../database/connection');

	connection = connection.getConnection();
	
	var limit  = range == null ? '100' : range*100 ;
	var offset = limit - 100;
	var query = "SELECT * FROM "+tableName + " LIMIT "+offset +" , " + limit +";";
	console.log(tablesDesc);
	connection.query(query, function (err, tableData, fields) {
	  	if(err){
	   		throw err;
		}else if(tableData) {
			console.log(tableData);
			res.render('show', { 
				tableDesc: tablesDesc,
				tableData: tableData
			});	
		}
	});
});

router.get('/insert', function(req, res, next) {
	var tableName = req.query.table;
	var tablesDesc = require('../database/'+tableName+'.json');	
	res.render('insert', { tableDesc: tablesDesc, tableName : tableName });
});

router.post('/insert', function(req, res, next) {
	var tableName = req.query.tableName;
	var params = req.body;

	var tablesDesc = require('../database/'+tableName+'.json');	
	var connection = require('../database/connection');

	connection = connection.getConnection();
	
	var keys = Object.keys(params);
	var values = Object.values(params);

	var query = "INSERT INTO " + tableName  + "(";
	keys.forEach(key => {
		query += key +","
	})
	query = query.substring(0 ,query.length -1);
	query += ") VALUES(";
	values.forEach(value => {
		query += "'" + value +"',"
	})
	query = query.substring(0 ,query.length -1);
	query += ");";
	console.log(query);
	connection.query(query, function (err, result, fields) {
	  	if(err){
	   		res.render('insert', { tableDesc: tablesDesc, tableName : tableName , err : err });
		}else if(result) {
			res.render('insert', { tableDesc: tablesDesc, tableName : tableName });
		}
	});
});


module.exports = router;
