var models=require('./schemaTestlab');

//var Cat=new models.petType({name:"Cat"});
//var Dog=new models.petType();
//Dog.name="Dog";

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback (done) {
  // yay connected!
  console.log('opened');
//var Cat=new models.petType();
//Cat.findOne();
models.petType.findOne({name:"Cat"},function(err,cat){
	if(err) console.log (err);
	console.log('hi');
	console.log(cat);
	Cat=cat;
	
}).then(done);

//console.log(Cat);

//Cat.save();

//Dog.save();
}).then(mongoose.disconnect());
//mongoose.disconnect();
