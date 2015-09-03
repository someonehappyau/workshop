'use strict';

var svcMCMaker=require('../service/svcMCMaker');

function getAll(callback){
	svcMCMaker.getAll(callback);
};

function getOneById(id,callback){
	svcMCMaker.getOneById(id,callback);
};

function getOneByLabel(label,callback){
	svcMCMaker.getOneByLabel(label,callback);
};

function addOne(mcmaker,callback){
	svcMCMaker.addOne(mcmaker,callback);
};

function updateOneById(mcmaker,callback){
	svcMCMaker.updateOneById(mcmaker,callback);
};

module.exports={
	getAll:getAll,
	getOneById:getOneById,
	getOneByLabel:getOneByLabel,

	addOne:addOne,
	updateOneById:updateOneById,
};
