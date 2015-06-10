var svcTDType=require('../service/svcTDType');

exports.getTDTypes=function(typeName,callback){
	svcTDType.getAll(typeName,callback);
};

exports.getTDTypeById=function(typeName,id, callback){
	svcTDType.getOneById(id,callback);
};

exports.getTDTypeByName=function(typeName,name,callback){
	svcTDType.getOneByName(name,callback);
};

exports.addTDType=function(typeName,name,desc,callback){
	svcTDType.addOne(name,desc,callback);
};

exports.updateTDTypeById=function(typeName,id,name,desc,callback){
	svcTDType.updateOneById(id,name,desc,callback);
};

exports.deleteTDTypeById=function(typeName,id,callback){
	svcTDType.deleteOneById(id,callback);
};


