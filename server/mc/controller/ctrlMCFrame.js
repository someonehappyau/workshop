'use strict';

var svcMCFrame=require('../service/svcMCFrame');

function getOneById(id,callback){
	svcMCFrame.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCFrame.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCFrame.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCFrame.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
