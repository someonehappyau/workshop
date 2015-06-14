var TDType=require('../model/TDTypes');

exports.initialize=function(modelName){
	TDType(modelName);	
};

exports.getAll=function(modelName,callback){
	(new (TDType(modelName)))._getAll(modelName,callback);
};

exports.getOneById=function(modelName,id,callback){
	(new (TDType(modelName)))._getOneById(modelName,id,callback);
};

exports.getOneByName=function(modelName,name,callback){
	(new (TDType(modelName)))._findByName(modelName,name,callback);
};

exports.addOne=function(modelName,name,desc,callback){
	(new (TDType(modelName)))._addOne(modelName,name,desc,callback);
};

exports.updateOneById=function(modelName,id,name,desc,callback){
	(new (TDType(modelName)))._updateOneById(modelName,id,name,desc,callback);
};

exports.deleteOneById=function(modelName,id,callback){
	(new (TDType(modelName)))._deleteOneById(modelName,id,callback);
};


