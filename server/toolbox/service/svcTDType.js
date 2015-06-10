var TDTypes=require('../model/TDTypes');


exports.getAll=function(modelName,callback){
	(new TDType(modelName))._getAll(modelName,callback);
};

exports.getOneById=function(id,callback){
	(new TDType(modelName))._getOneById(TDType.modelName,id,callback);
};

exports.getOneByName=function(name,callback){
	(new TDType(modelName))._findByName(TDType.modelName,name,callback);
};

exports.addOne=function(name,desc,callback){
	(new TDType(modelName))._addOne(TDType.modelName,name,desc,callback);
};

exports.updateOneById=function(id,name,desc,callback){
	(new TDType(modelName))._updateOneById(TDType.modelName,id,name,desc,callback);
};

exports.deleteOneById=function(id,callback){
	(new TDType(modelName))._deleteOneById(TDType.modelName,id,callback);
};


