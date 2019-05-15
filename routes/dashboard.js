var express = require('express');
var router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken.verifyToken);

router.get('/', function(req, res, next) {
	var tables = require('../database/tables.json');
  	res.render('dashboard', { 
  		tables: tables,
		username: req.decoded.username 
  	});
});

router.get('/show', function(req, res, next) {
	var tableName = req.query.table;
	var range = req.query.range;
	var error = req.query.err;
	var tablesDesc = require('../database/'+tableName+'.json');	
	var connection = require('../database/connection');
	connection = connection.getConnection();
	if(range == null || range <= 0){
		range = 1;
	}
	var limit  = range * 10;
	var offset = limit - 10;
	var query = "SELECT * FROM "+ tableName +" LIMIT "+ offset +" , "+ limit +";";
	console.log(query);
	connection.query(query, function (err, tableData, fields) {
	  	if(err){
	   		throw err;
		}else if(tableData) {
			res.render('show', { 
				tableDesc: tablesDesc,
				tableData: tableData,
				tableName: tableName,
				range: range,
				err: error,
				username: req.decoded.username
			});	
		}
	});
});

router.get('/insert', function(req, res, next) {
	var tableName = req.query.table;
	var tablesDesc = require('../database/'+tableName+'.json');	
	res.render('insert', { 
		tableDesc: tablesDesc, 
		tableName : tableName, 
		err : null,
		username: req.decoded.username 
	});
});

router.post('/insert', function(req, res, next) {
	var tableName = req.query.table;
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
	query = query.substring(0 ,query.length - 1);
	query += ") VALUES (";
	values.forEach(value => {
		query += "'" + value +"',";
	})
	query = query.substring(0 ,query.length - 1);
	query += ");";
	console.log(query);
	connection.query(query, function (err, result, fields) {
	  	if(err){
	   		res.render('insert', { 
	   			tableDesc: tablesDesc, 
	   			tableName : tableName , 
	   			err : err,
				username: req.decoded.username 
	   		});
		}else if(result) {
			res.redirect('/dashboard/show?table=' + tableName);
		}
	});
});

router.post('/delete', function(req, res, next) {
	var tableName = req.query.table;
	var params = req.body;
	var tablesDesc = require('../database/'+tableName+'.json');	
	var connection = require('../database/connection');
	connection = connection.getConnection();
	
	var keys = Object.keys(params);
	var values = Object.values(params);
	var query = "DELETE FROM " + tableName  + " WHERE ";
	keys.forEach(key => {
		if(params[key])
			query += key +"='" + params[key] +"' and ";
	})
	query = query.substring(0 ,query.length -4);
	query += ";";
	console.log( query);
	connection.query(query, function (err, result, fields) {
	  	if(err){
	   		res.redirect('/dashboard/show?table=' + tableName+"?err="+err);
		}else if(result) {
			res.redirect('/dashboard/show?table=' + tableName);
		}
	});
});

router.post('/display', function(req, res, next) {
	var tableName = req.query.table;
	var params = req.body;
	var tablesDesc = require('../database/'+tableName+'.json');	
	var connection = require('../database/connection');
	connection = connection.getConnection();
	
	var keys = Object.keys(params);
	var values = Object.values(params);
	var query = "SELECT * FROM " + tableName  + " WHERE ";
	keys.forEach(key => {
		if(params[key])
			query += key +"='" + params[key] +"' and ";
	})
	query = query.substring(0 ,query.length -4);
	query += ";";
	console.log( tablesDesc);
	connection.query(query, function (err, tableData, fields) {
	  	if(err){
	   		res.render('display', {
	   			tableDesc: tablesDesc, 
	   			tableName : tableName , 
	   			err : err,
				username: req.decoded.username
	   		});
		}else if(tableData) {
			// console.log(tableData)
			res.render('display', {
				tableDesc: tablesDesc, 
	   			tableName : tableName,
	   			tableData: tableData,
	   			err : null,
				username: req.decoded.username
			});
		}
	});
});


router.post('/update', function(req, res, next) {
	var tableName = req.query.table;
	var params = req.body;
	var tablesDesc = require('../database/'+tableName+'.json');	
	var connection = require('../database/connection');
	connection = connection.getConnection();
	
	var keys = Object.keys(params);
	var values = Object.values(params);
	var query = "UPDATE " + tableName  + "SET "



	query += " WHERE ";
	keys.forEach(key => {
		if(params[key])
			query += key +"='" + params[key] +"' and ";
	})
	query = query.substring(0 ,query.length -4);
	query += ";";
	console.log( query);
	connection.query(query, function (err, tableData, fields) {
	  	if(err){
	   		res.render('display', {
	   			tableDesc: tablesDesc, 
	   			tableName : tableName , 
	   			err : err,
				username: req.decoded.username
	   		});
		}else if(tableData) {
			// console.log(tableData)
			res.render('display', {
				tableDesc: tablesDesc, 
	   			tableName : tableName,
	   			tableData: tableData,
	   			err : null,
				username: req.decoded.username
			});
		}
	});
});
module.exports = router;
