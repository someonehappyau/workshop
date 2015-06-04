var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaCategory=Schema({
	name:{type:String, unique:true},
    	description:{type:String}
});

modules.exports=mongoose.model('TDCategory',schemaCategory);

