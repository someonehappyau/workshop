'use strict';

var svcMCDrive=require('../service/svcMCDrive');

function getOneById(id,callback){
	svcMCDrive.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCDrive.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCDrive.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCDrive.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
