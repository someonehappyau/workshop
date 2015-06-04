var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaToDo=Schema({
	shortDesc:{type:String},
    	description:{type:String},
    	creator:{type:Schema.Types.ObjectId},
    	dateCreated:{type:Date, default:Date.now},
    	dateDue:{type:Date},
    	priority:{type:Schema.Types.ObjectId},
    	status:{type:Schema.Types.ObjectId}
});

modules.exports=mongoose.model('TDToDo',schemaToDo);

