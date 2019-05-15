var jwt = require('jsonwebtoken');
var config = require('../config/config');
module.exports = {
	getToken: function (user) {
		var token = jwt.sign(user, config.superSecret, { expiresIn: 60 * 60 });
		return token;
	}
}