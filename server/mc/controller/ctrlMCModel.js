'use strict';

var svcMCModel=require('../service/svcMCModel');

function getAll(page,searchStr,callback){
	svcMCModel.getAll(page,10,searchStr,callback);
};

function getCount(searchStr,callback){
	svcMCModel.getCount(searchStr,callback);
};

function getOneById(id,callback){
	svcMCModel.getOneById(id,callback);
};

function getGallery(mcid,callback){
	svcMCModel.getGallery(mcid,callback);
};

function addOne(mc,callback){
	svcMCModel.addOne(mc,callback);
};

function addGalleryLink(mcid,picid,callback){
	svcMCModel.addGalleryLink(mcid,picid,callback);
};

function updateOneById(id,mc,callback){
	svcMCModel.updateOneById(id,mc,callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,
	getGallery:getGallery,

	addOne:addOne,
	addGalleryLink:addGalleryLink,
	updateOneById:updateOneById,
};
