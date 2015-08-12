'use strict';

var async=require('async');

var pool=require('../../db/dbpool');
var mysql=require('mysql');

function getAll(page,countPerPage,callback){
	var offset=(page-1)*countPerPage;
	var condition='where 1=1 ';

	var resultCount,resultData,errCount,errResult;
	async.parallel([
		function(done){
			pool.query('select count(*) as count from MCModels '+condition,function(err,result){
				errCount=err;
				resultCount=result;
				done();
			});
		},
		function(done){
			pool.query('select * from MCModels '+condition+' order by makerLabel, label limit ?,?',[offset,countPerPage],function(err,result){
				errResult=err;
				resultData=result;
				done();
			});
		}],
		function(){
			if (errCount)
				callback(errCount,null);
			else if (errResult)
				callback(errResult,null);
			else if (!resultCount)
				callback(null,resultCount);
			else if (!resultData)
				callback(null,resultData);
			else
				callback(null,{totalCount:resultCount[0].count,data:resultData});
		});
};

function getCount(callback){
	var condition='where 1=1 ';
	pool.query('select count(*) as count from MCModels '+condition,function(err,data){
		console.log(JSON.stringify(data[0].count));
		if (err) callback(err,-1);
		else callback(null, data[0].count);
	});
};

function getOneById(id,callback){
	pool.query('select * from MCModels where id=?',[id],function(err,data){
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
	pool.query('insert into MCModel set ?',[data],callback);
};

function updateOneById(id, data, callback){
	pool.query('update MCModel set ? where id=?',[data,id],callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,

	addOne:addOne,
	updateOneById:updateOneById,
};
