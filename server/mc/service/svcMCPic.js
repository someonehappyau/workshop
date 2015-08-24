'use strict';

var pool=require('../../db/dbpool');
var mysql=require('mysql');

function addOne(fileName,callback){
	pool.query('insert into MCPic set fileName=?',[fileName],callback);
};

module.exports={
	addOne:addOne,
};
