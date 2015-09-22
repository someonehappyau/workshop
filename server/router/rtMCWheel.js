'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCWheel=require('../mc/controller/ctrlMCWheel');

router.get('/wheel/:id',function(req,res){
	if (req.params.id==='list'){
		res.status(500).end();
	}
	else{
		console.log(req.query);
		if (req.query.byModel==='true'){
			ctrlMCWheel.getOneByModelId(req.params.id,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end('not found');
				else res.status(200).end(JSON.stringify(data));
			});
		}
		else{
			ctrlMCWheel.getOneById(req.params.id,function(err,data){
				if (err || !data) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(data));
			});
		}
	}
});

router.post('/wheel/:id',function(req,res){
	if (req.params.id==='update'){
		var id=req.body.wheel.id;
		delete req.body.wheel.id;
		if (!id)
			ctrlMCWheel.addOne(req.body.wheel,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end();
				else res.status(200).end(JSON.stringify(data));
			});
		else
			ctrlMCWheel.updateOneById(id,req.body.wheel,function(err,data){
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
