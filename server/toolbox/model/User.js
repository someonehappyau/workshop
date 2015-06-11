var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose');

var schemaUser=new Schema({
	username:{type:String, unique:true},
	password:{type:String},
	status:{type:Schema.Types.ObjectId},
});

schemaUser.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',schemaUser);

