'use strict';

var TDTodo=require('../model/TDTodo');
var svcTDType=require('../service/svcTDType');
var async=require('async');

exports.getTodos=function(callback){
	TDTodo.find(function(err,todos){
		if (err || !todos)
			callback(err,todos);
		else{
			TDTodo.populate(todos,[
				{path:'creator',model:'User',select:'_id username'},
				{path:'category',model:'TDCategory'},
				{path:'priority',model:'TDPriority'},
				{path:'status',model:'TDStatus'}
				]).then(function(todos){
					callback(null,todos);
				},
				function(err){
					callback(err,todos)
				});
		}	
	});
};

exports.getOne=function(id,callback){
	TDTodo.findById(id,callback);
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
				console.log(todo);
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

