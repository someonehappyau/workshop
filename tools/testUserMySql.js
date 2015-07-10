var svcUser=require('../../server/toolbox/service/svcUser');
var pool=require('../../server/db/dbpool');
var bcrypt=require('bcrypt');

//svcUser.addOne('user2','woshiuser222',function(err,result){});

svcUser.getOneByUsername('user2',function(err,result){
	console.log(err);
	console.log(result);
	bcrypt.compare('woshiuser222',result.password,function(err,res){
		console.log(err);
		console.log(res);
	});
	pool.end(function(err){
		if (err) console.log(err);
	});
});
