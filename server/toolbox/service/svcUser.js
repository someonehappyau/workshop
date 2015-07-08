var User=require('../model/User');
var svcTDType=require('../service/svcTDType');
var pool=require('../../db/dbpool');
var bcrypt=require('bcrypt');

exports.addOne=function(username,password,callback){
	bcrypt.hash(password,8,function(err,hash){
		if (err) callback(err,null);
		else{
			console.log(hash);
			var user={username:username,password:hash,role:1,state:1};
			pool.query('insert into User set ?',user,function(err,result){
				console.log(err);
				console.log(result);
				if (err) callback(err,null);
				else callback(null,result);
			});
		}
	});
};

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

exports.getUserById=function(id,callback){
	User.findById(id,callback);
};

exports.getOneByUsername=function(username,callback){
	var user={username:username};
	pool.query('select * from Users where ?',user,function(err,result){
		if (err) callback(err,null);
		else callback(null,result);
	});	
};

exports._getUserByUsername=function(username,callback){
	User.findOne({username:username},callback);
};

exports.getUsers=function(callback){
	User.find(callback);
};

exports.deleteUserById=function(id,callback){
	User.findByIdAndRemove(id,callback);
};

exports.updatePassword=function(id,password,callback){
	bcrypt.hash(password,8,function(err,hash){
		if (err) callback(err,null);
		else{
			var user={password:hash};
			pool.query('update User set ? where id=?',[user,id],function(err,result){
				console.log(err);
				console.log(result);
				if (err) callback(err,null);
				else callback(null,result);
			});
		}
	});
};

exports._updatePassword=function(id,password,callback){
	User.findByIdAndUpdate(id,{password:password},callback);
};

exports.updateStatus=function(id,status,callback){
	svcTDType.getOneByName('UserStatus',status,function(err,userstatus){
		if (err || !!!userstatus) callback(err,null);
		else{
			User.findByIdAndUpdate(id,{status:userstatus._id},callback);
		}
	});
};

exports.updatePl=function(id,pl,plexpiry,callback){
	User.findByIdAndUpdate(id,{pl:pl,plexpiry:plexpiry},callback);
};

exports.populateUser=function(user,callback){
	user.populate([
			{path:'role',model:'UserRole'},
			{path:'status',model:'UserStatus'}
		],
		callback);
};

exports.profile=function(sessionid,username,callback){
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

exports.updateSessionId=function(id,sessionid,callback){
	User.findByIdAndUpdate(id,{sessionid:sessionid},callback);
};

exports.loggedIn=function(req,res,next){
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
