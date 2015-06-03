var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//mongoose.connect('mongodb://localhost/test');
var petSchema=new Schema({
	name: String,
    	type: Schema.Types.ObjectId,
});

var petTypeSchema=new Schema({
	name:String,
});

module.exports.pet=mongoose.model('pet',petSchema);
module.exports.petType=mongoose.model('petType', petTypeSchema);



