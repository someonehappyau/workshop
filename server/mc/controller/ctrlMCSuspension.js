'use strict';

var svcMCSuspension=require('../service/svcMCSuspension');

function getOneById(id,callback){
	svcMCSuspension.getOneById(id,callback);
};

function getOneByModelId(modelId, callback){
	svcMCSuspension.getOneByModelId(modelId, callback);
};

function addOne(engine, callback){
	svcMCSuspension.addOne(engine,callback);
};

function updateOneById(id, engine, callback){
	svcMCSuspension.updateOneById(id,engine,callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
