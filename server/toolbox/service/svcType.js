var typeHelper=require('../model/Type');
var mongoose=require('mongoose');

var Type=typeHelper('Type');

exports.setTypeName=function(name){
	Type=typeHelper(name);
};

exports.addOne=function(name,desc,callback){
	var type=new Type;
	type.name=name;
	type.description=desc;
	//console.log(Type.collection.name);
	
	type.save(function(err){
		if(err)
			callback(err,null);
		else
			callback(null,type);
	});
};

exports.getOneById=function(id,callback){
	Type.findById(id,function(err,type){
		if(err)
			callback(err,null);
		else
			callback(null,type);
	});
};

exports.getAll=function(callback){
	console.log(Type.collection.name);
	Type.find(function(err,types){
		if(err)
			callback(err,null);
		else
			callback(null,types);
	});
};


