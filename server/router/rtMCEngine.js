'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCEngine=require('../mc/controller/ctrlMCEngine');

router.get('/engine/:id',function(req,res){
	if (req.params.id==='list'){
		res.status(500).end();
	}
	else{
		console.log(req.query);
		if (req.body.byModel==='true'){
			ctrlMCEngine.getOneByModelId(req.params.id,function(err,engine){
				if (err || !engine) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(engine));
			});
		}
		else{
			ctrlMCEngine.getOneById(req.params.id,function(err,engine){
				if (err || !engine) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(engine));
			});
		}
	}
});

router.post('/engine/:id',function(req,res){
	if (req.params.id==='update'){
		var id=req.body.engine.id;
		delete req.body.engine.id;
		if (!id)
			ctrlMCEngine.addOne(req.body.engine,function(err,engine){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!engine) res.status(500).end();
				else res.status(200).end(JSON.stringify(engine));
			});
		else
			ctrlMCEngine.updateOneById(id,req.body.engine,function(err,engine){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!engine) res.status(500).end();
				else res.status(200).end(JSON.stringify(engine));
			});
	}
	else{
		res.status(404).end();
	}
});

module.exports=router;
