var mysql = require('mysql');
var fs = require('fs');
var connection;
module.exports = {
	createConnection : function (config) {
		config = {
			host     : 'localhost',
			user     : 'root1',
			password : '1234',
			database : 'publish'
		}
		connection =  mysql.createConnection(config);
		connection.connect();
		return connection;
	},
	init : function (connection) {
		// connection.query('SHOW TABLES;', function (err, tableNames, fields) {
		//   	if(err){
		//    		return err;
		// 	}
		// 	if(tableNames) {
		// 		tablN = [];
		// 		tableNames.forEach((tableNames) => {
		// 			var tableName = tableNames[Object.keys(tableNames)[0]];
		// 			tablN.push(tableName);
		// 			connection.query('DESC '+ tableName +';', function (err, tableDesc, fields) {
		// 			  	if(err){
		// 			   		throw err;
		// 				}else if(tableDesc) {
		// 					fs.writeFile('./database/'+tableName+'.json',JSON.stringify(tableDesc), function (err) {
		// 						if(err){
		// 							return err;
		// 						}
		// 						console.log('Saved!');
		// 					});
		// 				}
		// 			});					
		// 		})

		// 		fs.writeFile('./database/tables.json',JSON.stringify(tablN), function (err) {
		// 			if(err){
		// 				return err;
		// 			}
		// 			// console.log(tablN);
		// 		});
		// 	}
		// });
	},
	getConnection : function() {
		return connection;
	}
}

		