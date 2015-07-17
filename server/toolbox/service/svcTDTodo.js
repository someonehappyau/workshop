'use strict';

var TDTodo=require('../model/TDTodo');
var svcTDType=require('../service/svcTDType');
var async=require('async');

var pool=require('../../db/dbpool');
var mysql=require('mysql');

function getAll(page, countPerPage,abandon,done,callback){
	var offset=(page-1)*countPerPage;
	var condition='';
	if (abandon==='none')
		condition="where stateLabel<>'abandoned'";
	if (done==='none'){
		if (abandon==='none')
			condition=condition+' and ';
		else
			condition='where ';
			
		condition=condition+"stateLabel<>'done'";
	}
	var sql=mysql.format('select * from TDTodos '+condition+' order by dateDue desc limit ?,?',[offset,countPerPage]);
	console.log(sql);
	pool.query('select * from TDTodos '+condition+' order by dateDue desc limit ?,?',[offset,countPerPage],callback);
};	

function getCount(callback){
	pool.query('select count(*) as count from TDTodos',function(err,data){
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

function populateTodo(todo,callback){
	TDTodo.populate(todo,[
		{path:'creator',model:'User',select:'_id username'},
		{path:'category',model:'TDCategory'},
		{path:'priority',model:'TDPriority'},
		{path:'status',model:'TDStatus'}
		]).then(function(todo_updated){
			callback(null,todo_updated);
		},
		function(err){
			callback(err,todo)
		});
}


exports._getTodos=function(page,abandon,done,callback){
	var query={};
	//if (abandon==='none')
	//	query=;
	TDTodo.find(query)
		.skip((page-1)*10)
		.limit(10)
		.exec(function(err,todos){
		if (err || !todos)
			callback(err,todos);
		else{
			populateTodo(todos,callback);
		}	
	});
};

exports._getCount=function(callback){
	TDTodo.count(callback);
};

exports._getOne=function(id,callback){
	TDTodo.findById(id,function(err,todo){
		if(err || !todo)
			callback(err,todo);
		else{
			populateTodo(todo,callback);
		}	
	});
};

exports._addOne=function(shortDesc,description,creator,dateDue,category,priority,callback){
	var hasErr=false;
	var myErr=null;
	var myData=null;
	var status=null;
	async.series([
		function(done){
			svcTDType.getOneByName('TDStatus','Normal',function(err,data){
				if (err || !data){
					hasErr=true;
					myErr=err;
					myData=data;
					done();
				}
				else{
					status=data._id;
					done();
				}
			});
		},
		function(done){
			if (hasErr===true){
				done();
			}
			else if(!category){
				svcTDType.getOneByName('TDCategory','Default',function(err,data){
					if (err || !data){
						hasErr=true;
						myErr=err;
						myData=data;
						done();
					}
					else{
						category=data._id;
						done();
					}
				});
			}
			else
				done();
		},
		function(done){
			if (hasErr===true){
				done();
			}
			else if(!priority){
				svcTDType.getOneByName('TDPriority','3',function(err,data){
					if(err||!data){
						hasErr=true;
						myErr=err;
						myData=data;
						done();
					}
					else{
						priority=data._id;
						done();
					}
				});
			}
			else
				done();
		}],
		function(){
			if (hasErr===true){
				callback(myErr,myData);
			}
			else{
				var todo=new TDTodo();
				todo.shortDesc=shortDesc;
				todo.description=description;
				todo.creator=creator;
				todo.dateDue=dateDue;
				todo.category=category;
				todo.priority=priority;
				todo.status=status;
				todo.save(callback);
			}
		});
};			

exports._update=function(id,description,dateDue,priority,callback){
	TDTodo.findByIdAndUpdate(id,
			{description:description,
			dateDue:dateDue,
			priority:priority},callback);
};

exports._deleteTodoById=function(id,callback){
	TDTodo.findByIdAndRemove(id,callback);
};

exports._abandon=function(id,callback){
	TDTodo.findById(id,function(err,todo){
		if (err || !todo)
			callback(err,todo);
		else{
			svcTDType.getOneByName('TDStatus','Normal',function(err,data){
			       	if (err || !data)
					callback(err,data);
				else if (data._id.equals(todo.status)===false){
					callback(null,false);
				}
				else{
					svcTDType.getOneByName('TDStatus','Abandoned',function(err,data){
						if (err || !data)
							callback(err,data);
						else{
							todo.status=data._id;
							todo.dateUpdated=Date.now();
							todo.save();
							callback(null,todo);
						}
					});
				}
			});
		}
	});
};


exports._done=function(id,callback){
	TDTodo.findById(id,function(err,todo){
		if (err || !todo)
			callback(err,todo);
		else{
			svcTDType.getOneByName('TDStatus','Normal',function(err,data){
			       	if (err || !data)
					callback(err,data);
				else if (data._id.equals(todo.status)===false){
					callback(null,false);
				}
				else{
					svcTDType.getOneByName('TDStatus','Done',function(err,data){
						if (err || !data)
							callback(err,data);
						else{
							todo.status=data._id;
							todo.dateUpdated=Date.now();
							todo.save();
							callback(null,todo);
						}
					});
				}
			});
		}
	});
};
