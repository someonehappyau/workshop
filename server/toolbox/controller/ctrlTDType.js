var svcTDType=require('../service/svcTDType');

exports.getTDTypes=function(typeName,callback){
	svcTDType.getAll(typeName,callback);
};

exports.getTDTypeById=function(id, callback){
	svcTDType.getOneById(id,callback);
};

exports.getTDTypeByName=function(name,callback){
	svcTDType.getOneByName(name,callback);
};

exports.addTDType=function(name,desc,callback){
	svcTDType.addOne(name,desc,callback);
};

exports.updateTDTypeById=function(id,name,desc,callback){
	svcTDType.updateOneById(id,name,desc,callback);
};

exports.deleteTDTypeById=function(id,callback){
	svcTDType.deleteOneById(id,callback);
};


