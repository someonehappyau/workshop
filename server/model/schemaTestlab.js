var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//mongoose.connect('mongodb://localhost/test');
var petSchema=new Schema({
	name: {type:String,unique:true},
    	type: Schema.Types.ObjectId,
});

var petTypeSchema=new Schema({
	name:{type:String,unique:true},
});

module.exports.pet=mongoose.model('pet',petSchema);
module.exports.petType=mongoose.model('petType', petTypeSchema);



