var User=require('../model/User');
var svcTDType=require('../service/svcTDType');

exports.register=function(username,password,callback){
	svcTDType.getOneByName('UserStatus','normal',function(err,userstatus){
		if (err) callback(err,null);
		else{
			User.register(new User({username:username,status:userstatus._id}),password,callback);
		}
	});
};
