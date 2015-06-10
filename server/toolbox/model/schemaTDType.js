var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaType=Schema({
	name:{type:String, unique:true},
    description:{type:String}
});


schemaType.methods._getAll=function(modelName,callback){
	var Type=this.model(modelName);
	Type.find(callback);
};

schemaType.methods._getOneById=function(modelName,id,callback){
	var Type=this.model(modelName);
	Type.findById(id,callback);
};

schemaType.methods._findByName=function(modelName,name,callback){
	var Type=this.model(modelName);
	Type.findOne({name:name},callback);
};

schemaType.methods._addOne=function(modelName,name,desc,callback){
	var Type=this.model(modelName);
	var type=new Type;
	type.name=name;
	type.description=desc;
	
	type.save(callback);
};

schemaType.methods._updateOneById=function(modelName,id,name,desc,callback){
	var Type=this.model(modelName);
	Type.findByIdAndUpdate(id,{name:name,description:desc},callback);
};

schemaType.methods._deleteOneById=function(modelName,id,callback){
	var Type=this.model(modelName);
	Type.findByIdAndRemove(id,callback);
};


module.exports=function(modelName){
	return mongoose.model(modelName,schemaType);
};

