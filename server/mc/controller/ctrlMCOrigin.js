'use strict';

var svcMCOrigin=require('../service/svcMCOrigin');

function getAll(page, callback){
	svcMCOrigin.getAll(page,10,callback);
};

function getCount(callback){
	svcMCOrigin.getCount(callback);
};

function getOneById(id,callback){
	svcMCOrigin.getOneById(id, callback);
};

function updateOneById(mc,callback){
	svcMCOrigin.updateOneById(mc.id, mc.mcFinal, callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,

	updateOneById:updateOneById,
};
