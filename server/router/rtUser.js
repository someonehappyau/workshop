var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var passport=require('passport');
var bcrypt=require('bcrypt');

router.get('/toolbox/user/:id',ctrlUser.loggedIn,function(req,res){
	if (req.params.id==='list'){
		ctrlUser.getUsers(function(err,users){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(users));
		});
	}
	else if (req.params.id==='byusername'){
		ctrlUser.getUserByUsername(req.query.username,function(err,user){
			if (err) 
				res.status(500).end(JSON.stringify(err));
			else if (user===null)
				res.status(500).end(JSON.stringify(err));
			else 
				res.end(JSON.stringify(user));
		});
	}
	else{
		ctrlUser.getUserById(req.params.id,function(err,user){
			if(err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(user));
		});		
	}

});

router.delete('/toolbox/user/:id',function(req,res){
	ctrlUser.deleteUserById(req.params.id,function(err){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.status(200).end();	
	});
});

router.post('/toolbox/user/:id',function(req,res){
	if (req.params.id==='login'){
		passport.authenticate('local',function(err,user){
			if(err) res.status(500).end(JSON.stringify(err));
			else if (!user) res.status(401).end('Username and/or Password is incorrect.');
			else{
				ctrlUser.populateUser(user,function(err,user){
					if (err) res.status(500).end(JSON.stringify(err));
					else{
						if (user.status.name==='normal'){
							ctrlUser.updateSessionId(user._id,req.sessionID,function(err,user){
								if (err) res.status(500).end(JSON.stringify(err));
								else{
									ctrlUser.populateUser(user,function(err,user){
										if (err) res.status(500).end(JSON.stringify(err));
										else{
											user.hash='';
											user.salt='';
											user.sessionid='';
											res.status(200)
											.cookie('username',user.username,{path:'/toolbox'}) 
											.end(JSON.stringify({sessionid:'',user:user}));
										}
									});
								}
							});

						}
						else
							res.status(401).end('Login failed');
					}
				});
			}
		})(req,res);
	}
	else if (req.params.id==='register'){
		ctrlUser.register(req.body.username,req.body.password,function(err,user){
			if (err) {res.status(500).end(JSON.stringify(err));}
			else res.status(200).end(JSON.stringify(user));
		});
	}
	else if (req.params.id==='logout'){
		req.logout();
	}
	else if (req.params.id==='profile'){
		ctrlUser.profile(req.sessionID,req.cookies.username,function(err,user){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!user){
 				res
				.status(401)
				.cookie('username','',{path:'/toolbox'})
				.end();
			}
			else{
				ctrlUser.populateUser(user,function(err,user){
					if (err) res.status(500).end(JSON.stringify(err));
					else{
						user.hash='';
						user.salt='';
						user.sessionid='';
						res
						.status(200)
						.end(JSON.stringify({sessionid:'',user:user}));
					}
				});
			}
		});
	}
	else{
		res.status(404).end();
	}
});


router.put('/toolbox/user/:id',function(req,res){
	if (req.params.id==='password'){
		ctrlUser.updatePassword(req.body.id,req.body.password,function(err,user){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(user));
		});
	}
	else if (req.params.id==='status'){
		ctrlUser.updateStatus(req.body.id,req.body.status,function(err,user){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(user));
		});
	}
	else{
		res.status(404).end();
	}
});

module.exports=router;
