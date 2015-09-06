'use strict';

var svcMCDimension=require('../service/svcMCDimension');

function getOneById(id,callback){
	svcMCDimension.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCDimension.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCDimension.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCDimension.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
