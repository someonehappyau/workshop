var svcUser=require('../../server/toolbox/service/svcUser');
var pool=require('../../server/db/dbpool');
var bcrypt=require('bcrypt');

svcUser.updatePasswordById(1,'woshiuser222',function(err,result){
	console.log(err);
	console.log(result);
});

//svcUser.addOne('user2','woshiuser222',function(err,result){});

//svcUser.getOneByUsername('user1',function(err,result){
//	console.log(result[0].password);
//	bcrypt.compare('woshiuser1111',result[0].password,function(err,res){
//		console.log(err);
//		console.log(res);
//	});
//	pool.end(function(err){
//		if (err) console.log(err);
//	});
//});
