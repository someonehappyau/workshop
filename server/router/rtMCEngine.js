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
		if (req.query.byModel==='true'){
			ctrlMCEngine.getOneByModelId(req.params.id,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end('not found');
				else res.status(200).end(JSON.stringify(data));
			});
		}
		else{
			ctrlMCEngine.getOneById(req.params.id,function(err,data){
				if (err || !data) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(data));
			});
		}
	}
});

router.post('/engine/:id',function(req,res){
	if (req.params.id==='update'){
		var id=req.body.engine.id;
		delete req.body.engine.id;
		if (!id)
			ctrlMCEngine.addOne(req.body.engine,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end();
				else res.status(200).end(JSON.stringify(data));
			});
		else
			ctrlMCEngine.updateOneById(id,req.body.engine,function(err,data){
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
