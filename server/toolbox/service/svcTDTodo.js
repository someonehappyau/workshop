'use strict';

var TDTodo=require('../model/TDTodo');
var svcTDType=require('../service/svcTDType');
var async=require('async');

exports.getTodos=function(callback){
	TDTodo.find(callback);
};

exports.addOne=function(shortDesc,description,creator,dateDue,category,priority,status,callback){
	var hasErr=false;
	var myErr=null;
	var myData=null;
	async.series([
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
				todo=new TDTodo();
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
