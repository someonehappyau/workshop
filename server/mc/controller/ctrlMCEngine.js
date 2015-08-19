'use strict';

var svcMCEngine=require('../service/svcMCEngine');

function getOneById(id,callback){
	svcMCEngine.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCEngine.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCEngine.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCEngine.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
