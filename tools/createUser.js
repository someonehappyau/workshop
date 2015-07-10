var pool=require('../server/db/dbpool');
var svcUser=require('../server/toolbox/service/svcUser');

console.log('username:'+process.argv[2]);
console.log('password:'+process.argv[3]);

if (typeof process.argv[2]==='undefined' || typeof process.argv[3]==='undefined')
	console.log('Usage: node createUser.js john johnisme');
else{
	svcUser.addOne(process.argv[2],process.argv[3],function(err,result){
		if (err)
			console.log(err);
		else
			console.log(result.affectedRows+' user has been created.');
		pool.end(function(){});
	});
}
