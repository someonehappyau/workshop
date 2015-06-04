var Type=require('../server/toolbox/service/svcType');
var mongoose=require('mongoose');
var async=require('async');
var t=require('./testlib');

connect=function(done){
	mongoose.connect('mongodb://localhost/test',function(err){
		done();
	});
};

fn1=function(done){
	Type.setTypeName('ItemType');
	Type.addOne('op1','This is Option 1.',function(err,type){
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
	Type.getAll(function(err,types){
		if (!err) console.log(types);
		done();
	});
};

fn3=function(done){
	Type.setCollectionName('ItemType');
	done();
};

fn4=function(done){
	t.fn(function(err,ts){
		if(err) console.log(err);
		else console.log(ts);
		done();
	});
};

disconnect=function(done){
	mongoose.disconnect();
	done();
};


async.series([connect,fn1,fn2,fn4,disconnect]);
