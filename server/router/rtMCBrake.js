'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCBrake=require('../mc/controller/ctrlMCBrake');

router.get('/brake/:id',function(req,res){
	if (req.params.id==='list'){
		res.status(500).end();
	}
	else{
		console.log(req.query);
		if (req.query.byModel==='true'){
			ctrlMCBrake.getOneByModelId(req.params.id,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end('not found');
				else res.status(200).end(JSON.stringify(data));
			});
		}
		else{
			ctrlMCBrake.getOneById(req.params.id,function(err,data){
				if (err || !data) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(data));
			});
		}
	}
});

router.post('/brake/:id',function(req,res){
	if (req.params.id==='update'){
		var id=req.body.brake.id;
		delete req.body.brake.id;
		if (!id)
			ctrlMCBrake.addOne(req.body.brake,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end();
				else res.status(200).end(JSON.stringify(data));
			});
		else
			ctrlMCBrake.updateOneById(id,req.body.brake,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end();
				else res.status(200).end(JSON.stringify(data));
			});
	}
	else{
		res.status(404).end();
	}
});

module.exports=router;
