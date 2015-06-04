var models=require('./schemaTestlab');
var async=require('async');





var mongoose=require('mongoose');

var Cat;


async.series([
	function(cb){
		mongoose.connect('mongodb://localhost/test');
		cb();
	},
	function(cb){
		models.pet.findOne({name:"wangcai"},function(err,wangcai){
			console.log(wangcai);
			models.petType.populate(wangcai,{path:'type',select:'name'},function(err,cai){
				console.log(cai);
				cb();
			});
			
		});

		//var Cat=new models.petType({name:"Cat"});
		//var Dog=new models.petType();
		//Dog.name="Dog";
		//console.log(Cat);
		//Cat.save(function(err){if (err) console.log(err);});
		//Dog.save();
//		models.petType.findOne({name:"Cat"},function(err,cat){
//			if(err) console.log (err);
//			console.log('hi');
//			console.log(cat._id);
//			Cat=cat;
//			var wangcai=new models.pet();
//			wangcai.name='wangcai';
//			wangcai.type=Cat._id;
//			wangcai.save(function(err){
//				if (err) console.log(err);
//				cb();
//			});
			//cb();
//		});
	},
	function(cb){
		console.log(Cat);
		cb();
	},
	function(cb){
		mongoose.disconnect();
		cb();
	}],
	function(err){
		if (err) console.log(err);
		console.log('hi');	
	});
