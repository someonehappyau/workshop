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
		passport.authenticate('local',function(err,user,info){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!user) res.status(401).end('Not able to log in user.');
			else{
				ctrlUser.updateSessionIdById(user.id,req.sessionID,function(err,result){
					if (err) res.status(500).end(JSON.stringify(err));
					else{
						user.password='';
						user.sessionId='';
						res.status(200)
						.cookie('username', user.username,{path:'/toolbox'})
						.end(JSON.stringify({sessionid:'',user:user}));
					}
				});
			}
		})(req,res);
	}
//	else if (req.params.id==='register'){
//		ctrlUser.register(req.body.username,req.body.password,function(err,user){
//			if (err) {res.status(500).end(JSON.stringify(err));}
//			else res.status(200).end(JSON.stringify(user));
//		});
//	}
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

				if (err) res.status(500).end(JSON.stringify(err));
				else{
					user.password='';
					user.sessionid='';
					res
					.status(200)
					.end(JSON.stringify({sessionid:'',user:user}));
				}
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
