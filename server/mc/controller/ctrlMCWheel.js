'use strict';

var svcMCWheel=require('../service/svcMCWheel');

function getOneById(id,callback){
	svcMCWheel.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCWheel.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCWheel.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCWheel.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
