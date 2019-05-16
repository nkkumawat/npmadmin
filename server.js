const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');

module.exports = {
	init : function (config) {
		return new Promise((resolve, reject) => {
			if(connection.init(connection.createConnection(config)) == "err") {
				reject("err");
			} else {
				resolve("success");
			}
		})
	},
	createUser : function (username , password) {
		return new Promise((resolve, reject) => {
			if(connection.createUser(username,password) == 'err' ) {
				reject("err");
			} else {
				resolve("success");
			}
		})
	},
	start : function (port) {
		const app = express()
		app.set('views', __dirname + '/views');
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.use(bodyParser.json({
		    limit: '8mb'
		}));
		app.use(bodyParser.urlencoded({
		    limit: '8mb',
		    extended: true
		}));
		app.use(cookieParser());
		app.use('/', express.static(path.join(__dirname, 'public')));
		app.use('/', userRouter);
		app.use('/dashboard', dashboardRouter);
		app.listen(port, () => console.log(`App listening on port ${port}!`))
	}
}