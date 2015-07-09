var svcUser=require('../service/svcUser');

function register(username,password,callback){
	svcUser.addOne(username,password,callback);
};

function getOneByUsername(username,callback){
	svcUser.getOneByUsername(username,callback);
};

function getOneById(id,callback){
	svcUser.getOneById(id,callback);
};

function updatePasswordById(id,password,callback){
	svcUser.updatePasswordById(id,password,callback);
};

function updateSessionIdById(id,sessionid,callback){
	svcUser.updateSessionIdById(id,sessionid,callback);
};

function profile(sessionId,username,callback){
	svcUser.profile(sessionId,username,callback);
};

function loggedIn(req,res,next){
	svcUser.loggedIn(req,res,next);
};

module.exports={
	register:register,
	
	getOneByUsername:getOneByUsername,
	getOneById:getOneById,
	
	updatePasswordById:updatePasswordById,
	updateSessionIdById:updateSessionIdById,

	profile:profile,
	loggedIn:loggedIn

};
