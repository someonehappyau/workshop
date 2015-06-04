var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaPriority=Schema({
	name:{type:String, unique:true},
    description:{type:String}
});

modules.exports=mongoose.model('TDPriority',schemaPriority);

