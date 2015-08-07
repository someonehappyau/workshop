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
			pool.query('select count(*) as count from MCOrigin '+condition,function(err,result){
				errCount=err;
				resultCount=result;
				done();
			});
		},
		function(done){
			pool.query('select * from MCOrigin '+condition+' order bby maker limit ?,?',[offset,countPerPage],function(err,result){
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


module.exports={
	getAll:getAll,

};
