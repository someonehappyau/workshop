var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaStatus=Schema({
	name:{type:String, unique:true},
    description:{type:String}
});

modules.exports=mongoose.model('TDStatus',schemaStatus);

