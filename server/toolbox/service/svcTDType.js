var pool=require('../../db/dbpool');

var TDType=require('../model/TDTypes');

//---------Private functions--------------------------------------------


//---------Exports functions--------------------------------------------
function getAll(typeName,callback){
	var type={typeLabel:typeName};
	pool.query('select * from Configs where ?',type,callback);
};

module.exports={
	getAll:getAll,

};

//---------Old functions------------------------------------------------
exports._initialize=function(modelName){
	TDType(modelName);	
};

exports._getAll=function(modelName,callback){
	(new (TDType(modelName)))._getAll(modelName,callback);
};

exports._getOneById=function(modelName,id,callback){
	(new (TDType(modelName)))._getOneById(modelName,id,callback);
};

exports._getOneByName=function(modelName,name,callback){
	(new (TDType(modelName)))._findByName(modelName,name,callback);
};

exports._addOne=function(modelName,name,desc,callback){
	(new (TDType(modelName)))._addOne(modelName,name,desc,callback);
};

exports._updateOneById=function(modelName,id,name,desc,callback){
	(new (TDType(modelName)))._updateOneById(modelName,id,name,desc,callback);
};

exports._deleteOneById=function(modelName,id,callback){
	(new (TDType(modelName)))._deleteOneById(modelName,id,callback);
};


