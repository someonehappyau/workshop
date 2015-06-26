'use strict';

var TDTodo=require('../model/TDTodo');
var svcTDType=require('../service/svcTDType');
var async=require('async');

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


exports.getTodos=function(page,abandon,done,callback){
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

exports.getCount=function(callback){
	TDTodo.count(callback);
};

exports.getOne=function(id,callback){
	TDTodo.findById(id,function(err,todo){
		if(err || !todo)
			callback(err,todo);
		else{
			populateTodo(todo,callback);
		}	
	});
};

exports.addOne=function(shortDesc,description,creator,dateDue,category,priority,callback){
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

exports.update=function(id,description,dateDue,priority,callback){
	TDTodo.findByIdAndUpdate(id,
			{description:description,
			dateDue:dateDue,
			priority:priority},callback);
};

exports.deleteTodoById=function(id,callback){
	TDTodo.findByIdAndRemove(id,callback);
};

exports.abandon=function(id,callback){
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


exports.done=function(id,callback){
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
