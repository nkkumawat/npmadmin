const jwt = require('jsonwebtoken'); 
const config = require('../config/config.js')


module.exports = {
	verifyToken: function(req, res, next) {
		const token = req.cookies.jwtToken;
		if (token) {
		    jwt.verify(token, config.superSecret, function(err, decoded) {      
		        if (err) {
		            return res.redirect('/?err=Please clear your browser cookies ');   
		        } else {
		            if (!decoded.username) {
		                res.redirect('/');
		            } else {
		                req.decoded = decoded; 
		                next();
		            }
		        }
		    });
		} else {
		    res.redirect('/');
		}
	},
	verifyTokenLogin: function(req, res, next) {
		const token = req.cookies.jwtToken;
		if (token) {
		    jwt.verify(token, config.superSecret, function(err, decoded) {      
		        if (err) {
		        	res.clearCookie('jwtToken');
		            return res.redirect('/?err=Please clear your browser cookies ');   
		        } else {
		            if (decoded.username) {
		                req.decoded = decoded; 
		            }
		            next();
		        }
		    });
		}else{
			next();
		}
	}
}