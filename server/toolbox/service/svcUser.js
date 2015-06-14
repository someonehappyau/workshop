var User=require('../model/User');
var svcTDType=require('../service/svcTDType');

exports.register=function(username,password,callback){
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

exports.getUserByUsername=function(username,callback){
	User.findOne({username:username},callback);
};

exports.getUsers=function(callback){
	User.find(callback);
};

exports.deleteUserById=function(id,callback){
	User.findByIdAndRemove(id,callback);
};

exports.updatePassword=function(id,password,callback){
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

exports.populateUser=function(user,callback){
	user.populate([
			{path:'role',model:'UserRole'},
			{path:'status',model:'UserStatus'}
		],
		callback);
};
