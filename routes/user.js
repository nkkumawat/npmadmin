var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var config = require('../config/config');
var verifyService = require('../services/verifyService'); 
const verifyToken = require('../middlewares/verifyToken');
router.use(verifyToken.verifyTokenLogin);

router.get('/', function(req, res, next) {
	if(req.decoded) {
		res.redirect('/dashboard');
	}else{
		var err = req.query.err;
		if(err == null){
			err = '';
		}
	  	res.render('login', {
	  		err: err
	  	});
  	}
});

router.post('/login', function(req, res, next) {
	var user = require('../database/usernpmadmin.json');
	var params = req.body;
	if(user.username == params.username){
		bcrypt.compare(params.password, user.password, function(err, resp) {
		    if(err ){
		    	res.redirect("/?err=Password Not Matched");
		    }else if(resp){
		    	var token = verifyService.getToken({username : params.username});
		    	var maxAge = 60 * 60 * 1000;
		    	res.cookie('jwtToken', token, { maxAge: maxAge, httpOnly: true }); 
		    	res.redirect("/dashboard")
		    }else{
		    	res.redirect("/?err=Password Not Matched");
		    }
		});
	}else {
		res.redirect("/?err=Username Not Found");
	}
});
router.get('/logout', function(req, res, next) {
	res.clearCookie('jwtToken');
	res.redirect('/');
});

module.exports = router;
