var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaType=Schema({
	name:{type:String, unique:true},
    description:{type:String}
});

module.exports=function(modelName){
	return mongoose.model(modelName,schemaType);
};

