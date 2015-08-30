'use strict';

var pool=require('../../db/dbpool');
var mysql=require('mysql');

function addOne(fileName,callback){
	pool.query('insert into MCPic set fileName=?',[fileName],callback);
};

function updatePosition(position,callback){
	pool.query('update MCGallery set position=? where id=?',[position.pos,position.id],callback);
};

function deletePic(id,callback){
	pool.query('delete from MCGallery where id=?',[id],callback);
};

module.exports={
	addOne:addOne,

	updatePosition:updatePosition,
	deletePic:deletePic,
};
