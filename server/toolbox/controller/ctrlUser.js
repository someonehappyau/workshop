var svcUser=require('../service/svcUser');

exports.register=function(username,password,callback){
	svcUser.register(username,password,callback);
};

exports.getUserByUsername=function(username,callback){
	svcUser.getUserByUsername(username,callback);
};

exports.getUserById=function(id,callback){
	svcUser.getUserById(id,callback);
};

exports.getUsers=function(callback){
	svcUser.getUsers(callback);
};

exports.deleteUserById=function(id,callback){
	svcUser.deleteUserById(id,callback);
};

exports.updatePassword=function(id,password,callback){
	svcUser.updatePassword(id,password,callback);
};

exports.updateStatus=function(id,status,callback){
	svcUser.updateStatus(id,status,callback);
};

exports.updatePl=function(id,pl,plexpiry,callback){
	svcUser.updatePl(id,pl,plexpiry,callback);
};

exports.updateSessionId=function(id,sessionid,callback){
	svcUser.updateSessionId(id,sessionid,callback);
};

exports.populateUser=function(user,callback){
	svcUser.populateUser(user,callback);
};

exports.profile=function(pl,username,callback){
	svcUser.profile(pl,username,callback);
};

exports.loggedIn=function(req,res,next){
	svcUser.loggedIn(req,res,next);
};
