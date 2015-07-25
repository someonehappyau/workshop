'use strict';

var async=require('async');

var pool=require('../../db/dbpool');
var mysql=require('mysql');

function getAll(page, countPerPage,normal,abandon,done,callback){
	var offset=(page-1)*countPerPage;
	var condition='where 1=1 ';
	if (normal==='false')
		condition=condition+" and stateLabel<>'normal'";
	if (abandon==='false')
		condition=condition+" and stateLabel<>'abandoned'";
	if (done==='false'){
		condition=condition+" and stateLabel<>'done'";
	}
	//var sql=mysql.format('select * from TDTodos '+condition+' order by dateDue asc limit ?,?',[offset,countPerPage]);
	//console.log(sql);
	var resultCount,resultData,errCount,errResult;
	async.parallel([
		function(done){
			pool.query('select count(*) as count from TDTodos '+condition,function(err,result){
				errCount=err;
				resultCount=result;
				done();
			});
		},
		function(done){
			pool.query('select * from TDTodos '+condition+' order by dateDue asc limit ?,?',[offset,countPerPage],function(err,result){
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
			       callback(null,resultCount)
			else if (!resultData)
				callback(null,resultData);
			else
				callback(null,{totalCount:resultCount[0].count,data:resultData});
		});
};	

function getCount(normal,abandon,done,callback){
	var condition='where 1=1 ';
	if (normal==='false')
		condition=condition+" and stateLabel<>'normal'";
	if (abandon==='false')
		condition=condition+" and stateLabel<>'abandoned'";
	if (done==='false'){
		condition=condition+" and stateLabel<>'done'";
	}
	pool.query('select count(*) as count from TDTodos '+condition,function(err,data){
		console.log(JSON.stringify(data[0].count));
		if (err) callback(err,-1);
		else callback(null, data[0].count);
	});
};

function getOneById(id,callback){
	pool.query('select * from TDTodos where id=?',[id],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function addOne(shortDesc,description,creator,dateDue,category,priority,callback){
	var data={
		shortDesc:shortDesc,
		description:description,
		category:category,
		priority:priority,
		dateDue:dateDue,
		creator:creator
	};
	pool.query('insert into TDTodo set ?',[data],callback);
};

function updateOneById(id, description,dateDue,priority,callback){
	var data={
		description:description,
		dateDue:dateDue,
		priority:priority,
	};
	pool.query('update TDTodo set ? where id=?',[data,id],callback);
};

function abandon(id,callback){
	pool.query('update TDTodo set state=3 where id=?',[id],callback);
};

function done(id,callback){
	pool.query('update TDTodo set state=2 where id=?',[id],callback);
};

function deleteOneById(id,callback){
	pool.query('delete from TDTodo where id=?',[id],callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,

	addOne:addOne,
	
	updateOneById:updateOneById,
	abandon:abandon,
	done:done,

	deleteOneById:deleteOneById,
};

