var svcTDType=require('../service/svcTDType');
var mongoose=require('mongoose');

exports.initialize=function(){
	svcTDType.initialize('UserRole');
	svcTDType.initialize('UserStatus');
};

exports.getTDTypes=function(typeName,callback){
	svcTDType.getAll(typeName,callback);
};

exports.getTDTypeById=function(typeName,id, callback){
	svcTDType.getOneById(typeName,id,callback);
};

exports.getTDTypeByName=function(typeName,name,callback){
	svcTDType.getOneByName(typeName,name,callback);
};

exports.addTDType=function(typeName,name,desc,callback){
	svcTDType.addOne(typeName,name,desc,callback);
};

exports.updateTDTypeById=function(typeName,id,name,desc,callback){
	svcTDType.updateOneById(typeName,id,name,desc,callback);
};

exports.deleteTDTypeById=function(typeName,id,callback){
	svcTDType.deleteOneById(typeName,id,callback);
};


