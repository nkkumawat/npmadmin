const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connection = require('./database/connection');

const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');

var port = 3000;

// module.exports = {

	// init : function (config) {
		
		connection.init(connection.createConnection({}))

	// }

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

	app.use('/user', userRouter);
	app.use('/dashboard', dashboardRouter);
	app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// }