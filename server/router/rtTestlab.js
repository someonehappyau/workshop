var express=require('express');
var router=express.Router();

var gm=require('gm');
var path=require('path');

router.get('/gm/ver1',function(req,res){
	console.log('hi');
	gm(path.join(__dirname,'../public/bak.png'))
		.drawText(10, 50, "from scratch")
		.write('./bak.png',function(err){
			if (err) console.log(err);
			res.status(200).end();
		});
		//.stream()
		//.pipe(res);
});

module.exports=router;
