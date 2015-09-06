'use strict';

var svcMCBrake=require('../service/svcMCBrake');

function getOneById(id,callback){
	svcMCBrake.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCBrake.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCBrake.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCBrake.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
