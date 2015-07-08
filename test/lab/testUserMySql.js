var svcUser=require('../../server/toolbox/service/svcUser');
var pool=require('../../server/db/dbpool');
var bcrypt=require('bcrypt');

//svcUser.addOne('user2','woshiuser222',function(err,result){});

svcUser.getOneByUsername('user1',function(err,result){
	console.log(result[0].password);
	bcrypt.compare('woshiuser111',result[0].password,function(err,res){
		console.log(err);
		console.log(res);
	});
	pool.end(function(err){
		if (err) console.log(err);
	});
});
