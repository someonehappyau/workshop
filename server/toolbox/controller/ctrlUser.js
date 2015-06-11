var svcUser=require('../service/svcUser');

exports.register=function(username,password,callback){
	svcUser.register(username,password,callback);
};
