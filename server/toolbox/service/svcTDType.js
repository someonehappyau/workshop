var TDType=require('../model/TDType');



exports.getAll=function(modelName,callback){
	(new TDType)._getAll(modelName,callback);
};

exports.getOneById=function(id,callback){
	(new TDType)._getOneById(TDType.modelName,id,callback);
};

exports.getOneByName=function(name,callback){
	(new TDType)._findByName(TDType.modelName,name,callback);
};

exports.addOne=function(name,desc,callback){
	(new TDType)._addOne(TDType.modelName,name,desc,callback);
};

exports.updateOneById=function(id,name,desc,callback){
	(new TDType)._updateOneById(TDType.modelName,id,name,desc,callback);
};

exports.deleteOneById=function(id,callback){
	(new TDType)._deleteOneById(TDType.modelName,id,callback);
};


