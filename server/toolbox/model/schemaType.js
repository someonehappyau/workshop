var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaType=Schema({
	name:{type:String, unique:true},
    description:{type:String}
});

schemaType.methods._addOne=function(modelName,name,desc,callback){
	var Type=this.model(modelName);
	var type=new Type;
	type.name=name;
	type.description=desc;
	
	type.save(function(err){
		if(err) callback(err,null);
		else callback(null,type);
	});
};

schemaType.methods._getAll=function(modelName,callback){
	var Type=this.model(modelName);
	Type.find(function(err,types){
		if(err) callback(err,null);
		else callback(null,types);
	});
};

schemaType.methods._getOneById=function(modelName,id,callback){
	var Type=this.model(modelName);
	Type.findById(id,function(err,type){
		if(err) callback(err,null);
		else callback(null,type);
	});
};

module.exports=function(modelName){
	return mongoose.model(modelName,schemaType);
};

