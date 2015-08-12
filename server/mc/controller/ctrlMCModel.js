'use strict';

var svcMCModel=require('../service/svcMCModel');

function getAll(page,callback){
	svcMCModel.getAll(page,10,callback);
};

function getCount(callback){
	svcMCModel.getCount(callback);
};

function getOneById(id,callback){
	svcMCModel.getOneById(id,callback);
};

function updateOneById(id,mc,callback){
	svcMCModel.updateOneById(id,mc,callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,

	updateOneById:updateOneById,
};
