'use strict';

var async=require('async');

var pool=require('../../db/dbpool');
var mysql=require('mysql');

function getOneByModelId(modelId, callback){
	pool.query('select * from MCDimensions where model=?',[modelId],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function getOneById(id, callback){
	pool.query('select * from MCDimensions where id=?',[id],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function addOne(data,callback){
	console.log(mysql.format('insert into MCDimension set ?',[data]));
	pool.query('insert into MCDimension set ?',[data],callback);
};

function updateOneById(id, data, callback){
	pool.query('update MCDimension set ? where id=?',[data,id],callback);
};

module.exports={
	getOneById:getOneById,
	getOneByModelId:getOneByModelId,

	addOne:addOne,
	updateOneById:updateOneById,
};
