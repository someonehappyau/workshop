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

exports.updatePl=function(id,pl,plexpiry,callback){
	console.log(plexpiry);
	User.findByIdAndUpdate(id,{pl:pl,plexpiry:plexpiry},callback);
};

exports.populateUser=function(user,callback){
	user.populate([
			{path:'role',model:'UserRole'},
			{path:'status',model:'UserStatus'}
		],
		callback);
};

exports.profile=function(pl,username,callback){
	User.findOne({username:username},function(err,user){
		if (err) callback(err,null);
		else if (!user) callback(null,false);
		else{
			if (user.pl===pl && user.username===username){
				if (Date.now()<user.plexpiry)
					console.log('small');
				else
					console.log('great');
				callback(null,user);
			}
			else{
				callback(null,false);
			}
		}
	});
};
