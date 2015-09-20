'use strict';

var svcMCOrigin=require('../service/svcMCOrigin');

function getAll(page,searchStr, callback){
	svcMCOrigin.getAll(page,10,searchStr,callback);
};

function getCount(searchStr,callback){
	svcMCOrigin.getCount(searchStr,callback);
};

function getOneById(id,callback){
	svcMCOrigin.getOneById(id, callback);
};

function updateOneById(id,mcFinal,callback){
	svcMCOrigin.updateOneById(id, mcFinal, callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,

	updateOneById:updateOneById,
};
