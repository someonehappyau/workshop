'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCSuspension=require('../mc/controller/ctrlMCSuspension');

router.get('/suspension/:id',function(req,res){
	if (req.params.id==='list'){
		res.status(500).end();
	}
	else{
		console.log(req.query);
		if (req.query.byModel==='true'){
			ctrlMCSuspension.getOneByModelId(req.params.id,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end('not found');
				else res.status(200).end(JSON.stringify(data));
			});
		}
		else{
			ctrlMCSuspension.getOneById(req.params.id,function(err,data){
				if (err || !data) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(data));
			});
		}
	}
});

router.post('/suspension/:id',function(req,res){
	if (req.params.id==='update'){
		var id=req.body.suspension.id;
		delete req.body.suspension.id;
		if (!id)
			ctrlMCSuspension.addOne(req.body.suspension,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end();
				else res.status(200).end(JSON.stringify(data));
			});
		else
			ctrlMCSuspension.updateOneById(id,req.body.suspension,function(err,data){
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
