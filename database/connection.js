var mysql = require('mysql');
var fs = require('fs');
var connection;
var bcrypt = require('bcrypt');
module.exports = {
	createConnection : function (config) {
		connection =  mysql.createConnection(config);
		connection.connect();
		return connection;
	},
	init : function (connection) {
		connection.query('SHOW TABLES;', function (err, tableNames, fields) {
		  	if(err){
		  		console.log(err);
		   		return "err";
			}
			if(tableNames) {
				tablN = [];
				tableNames.forEach((tableNames) => {
					var tableName = tableNames[Object.keys(tableNames)[0]];
					tablN.push(tableName);
					connection.query('DESC '+ tableName +';', function (err, tableDesc, fields) {
					  	if(err){
					   		return  "err";
						}else if(tableDesc) {
							fs.writeFile(__dirname + '/'+tableName+'.json',JSON.stringify(tableDesc), function (err) {
								if(err){
									console.log(err);
									return "err";
								}
								// console.log('Saved!');
							});
						}
					});					
				})
				fs.writeFile(__dirname + '/tables.json',JSON.stringify(tablN), function (err) {
					if(err){
						return "err";
					}else{
						return "success";
					}
				});
			}
		});
	},
	getConnection : function() {
		return connection;
	},
	createUser : function (username , password) {
		bcrypt.hash(password, 2, function(err, hash) {
			if(err){
			  	return "err";
			}else {
				var user = {
					username : username,
					password : hash
				}
				fs.writeFile(__dirname + '/usernpmadmin.json',JSON.stringify(user), function (err) {
					if(err){
						return "err";
					}else{
						return "success";
					}
				});
			}
		});
		console.log("User Created");
	}
}

		