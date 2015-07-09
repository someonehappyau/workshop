var User=require('../model/User');
var svcTDType=require('../service/svcTDType');
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

//-----------------for MangoDB, NOT in use any more--------------------------------------
exports._register=function(username,password,callback){
	svcTDType.getOneByName('UserStatus','normal',function(err,userstatus){
		if (err || !userstatus) callback(err,null);
		else{
			svcTDType.getOneByName('UserRole','user',function(err,userrole){
				if (err || !userrole) callback(err,null);
				else{
					User.register(new User({username:username,status:userstatus._id,role:userrole._id}),password,callback);
				}
			});
		}
	});
};


exports._getUserById=function(id,callback){
	User.findById(id,callback);
};


exports._getUserByUsername=function(username,callback){
	User.findOne({username:username},callback);
};

exports._getUsers=function(callback){
	User.find(callback);
};

exports._deleteUserById=function(id,callback){
	User.findByIdAndRemove(id,callback);
};


exports._updatePassword=function(id,password,callback){
	User.findByIdAndUpdate(id,{password:password},callback);
};

exports._updateStatus=function(id,status,callback){
	svcTDType.getOneByName('UserStatus',status,function(err,userstatus){
		if (err || !!!userstatus) callback(err,null);
		else{
			User.findByIdAndUpdate(id,{status:userstatus._id},callback);
		}
	});
};

exports._updatePl=function(id,pl,plexpiry,callback){
	User.findByIdAndUpdate(id,{pl:pl,plexpiry:plexpiry},callback);
};

exports._populateUser=function(user,callback){
	user.populate([
			{path:'role',model:'UserRole'},
			{path:'status',model:'UserStatus'}
		],
		callback);
};

exports._profile=function(sessionid,username,callback){
	User.findOne({username:username},function(err,user){
		if (err) callback(err,null);
		else if (!user) callback(null,false);
		else{
			if (user.sessionid===sessionid && user.username===username){
				callback(null,user);
			}
			else{
				callback(null,false);
			}
		}
	});
};

exports._updateSessionId=function(id,sessionid,callback){
	User.findByIdAndUpdate(id,{sessionid:sessionid},callback);
};

exports._loggedIn=function(req,res,next){
	var result=false;
	User.findOne({username:req.cookies.username},function(err,user){
		if (err || !user) result=false;
		else{
			if (user.sessionid===req.sessionID){
				result=true;
			}
			else{
				result=false;
			}
		}
		
		if(result===true){
			next();
		}
		else{
			res.status(401).end();
		}
	});
		
};

