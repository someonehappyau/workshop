var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schemaTodo=Schema({
	shortDesc:{type:String},
    	description:{type:String},
    	creator:{type:Schema.Types.ObjectId},
    	dateCreated:{type:Date, default:Date.now},
    	dateDue:{type:Date},
    	category:{type:Schema.Types.ObjectId},
    	priority:{type:Schema.Types.ObjectId},
    	status:{type:Schema.Types.ObjectId}
});

module.exports=mongoose.model('TDTodo',schemaTodo);

