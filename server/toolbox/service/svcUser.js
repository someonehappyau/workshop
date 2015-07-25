'use strict';

var pool=require('../../db/dbpool');
var bcrypt=require('bcrypt');

//------Private functions-----------------------------------------------------


//------Exports functions
function addOne(username,password,callback){
	bcrypt.hash(password,8,function(err,hash){
		if (err) callback(err,null);
		else{
			var user={username:username,password:hash,role:1,state:1};
			pool.query('insert into User set ?',user,callback);
		}
	});
};

function getOneById(id,callback){
	var id={id:id};
	pool.query('select * from Users where ?',id,function(err,result){
		if (err) callback(err,null);
		else if (result.length<=0) callback(null,null);
		else callback(null,result[0]);
	});
};

function getOneByUsername(username,callback){
	var user={username:username};
	pool.query('select * from Users where ?',user,function(err,result){
		if (err) callback(err,null);
		else if (result.length<=0) callback(null,false);
		else callback(null,result[0]);
	});	
};

function updatePasswordById(id,password,callback){
	bcrypt.hash(password,8,function(err,hash){
		if (err) callback(err,null);
		else{
			var user={password:hash};
			pool.query('update User set ? where id=?',[user,id],callback);
		}
	});
};

function updateSessionIdById(id,sessionId,callback){
	var session={sessionId:sessionId};
	pool.query('update User set ? where id=?',[session,id],callback);
};

function profile(sessionId,username,callback){
	getOneByUsername(username,function(err,user){
		if (err) callback(err,null);
		else if (!user) callback(null,false);
		else{
			console.log(JSON.stringify(user));
			if (user.sessionId===sessionId)
				callback(null,user);
			else
				callback(null,false);
		}
	});
};

function authenticate(username,password,done){
	getOneByUsername(username,function(err,user){
		if (err) return done(err);
		if (!user){
			return done(null,false,'Invalid username and/or password.');
		}
		if (user.state!=='normal'){
			return done(null,false,'Not able to log user in.');
		}
		bcrypt.compare(password, user.password, function(err, result){
			console.log(password);
			console.log(user.password);
			console.log(result);
			if (err) return done(err);
			if (result===true){
				return done(null,user);
			}
			else{
				return done(null,false,'Invalid username and/or password.');
			}
		});
	});
};

function loggedIn(req,res,next){
	var result=false;
	getOneByUsername(req.cookies.username,function(err,user){
		if (err || !user) result=false;
		else{
			if (user.sessionId===req.sessionID){
				result=true;
			}
			else{
				result=false;
			}
		}
		
		if (result===true){
			next();
		}
		else{
			res.status(401).end();
		}
	});
};

function serializeUser(user, done)
{
	done(null, user.id);
};

function deserializeUser(id, done)
{
	getOneById(id,done);
};


module.exports={
	addOne:addOne,

	getOneById:getOneById,
	getOneByUsername:getOneByUsername,

	updatePasswordById:updatePasswordById,
	updateSessionIdById:updateSessionIdById,

	profile:profile,
	loggedIn:loggedIn,

	authenticate:authenticate,
	serializeUser:serializeUser,
	deserializeUser:deserializeUser
};


