'use restrict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCOrigin=require('../mc/controller/ctrlMCOrigin');

router.get('/mco/:id',function(req,res){
	if (req.params.id==='list'){
		var page;
		if (!req.query.page)
			page=1;
		else
			page=req.query.page;

		console.log(page);
		ctrlMCOrigin.getAll(page,function(err,mcs){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!mcs) res.status(200).end(JSON.stringify());
			else res.status(200).end(JSON.stringify(mcs));
		});
	}
	else if (req.params.id==='count'){
		ctrlMCOrigin.getCount(function(err,count){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!count) res.status(200).end(JSON.stringify());
			else res.status(200).end(JSON.stringify({count:count}));
		});
	}
	else{
		ctrlMCOrigin.getOneById(req.params.id,function(err,mc){
			if (err || !mc) res.status(500).end(JSON.stringify(err));
			else{
				res.status(200).end(JSON.stringify(mc));
			}
		});
	}
});

router.post('/mco/:id',function(req,res){
	if (req.params.id==='update'){
		ctrlMCOrigin.updateOneById(req.body.mco,function(err,mc){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!mc) res.status(500).end();
			else res.status(200).end(JSON.stringify(mc));
		});
	}
	else{
		res.status(404).end();
	}
});

module.exports=router;
