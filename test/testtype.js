var Type=require('../server/toolbox/service/svcType');
var mongoose=require('mongoose');
var async=require('async');
//var t=require('./testlib');
var Category=require('../server/toolbox/service/svcCategory');

connect=function(done){
	mongoose.connect('mongodb://localhost/test',function(err){
		done();
	});
};

fn1=function(done){
	for(var i=11;i<=12;i++){
	Category.addOne('category_op'+i,'This is Option '+i+'.',function(err,type){
		console.log(type.name);
		if(err){
			console.log(err);
		}
		else{
			console.log(type);
		}
		if (i==10)
			done();
	});}
};

fn12=function(done){
	//Type.setTypeName('ItemType');
	for(var i=5;i<=6;i++)
	Type.addOne('types_op'+i,'This is Option '+i+'.',function(err,type){
		if(err){
			console.log(err);
		}
		else{
			console.log(type);
		}
		done();
	});
};

fn2=function(done){
	//console.log(Type.model.name);
	Type.getAll(function(err,types){
		if (!err) console.log(types);
		done();
	});
};

fn3=function(done){
	//Type.setTypeName('ItemType');
	Category.addOne();
	done();
};

fn4=function(done){
	Category.getAll(function(err,ts){
		if(err) console.log(err);
		else console.log(ts);
		done();
	});
};

disconnect=function(done){
	mongoose.disconnect();
	done();
};


async.series([connect,fn1,disconnect]);
