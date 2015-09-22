'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCDimension=require('../mc/controller/ctrlMCDimension');

router.get('/dimension/:id',function(req,res){
	if (req.params.id==='list'){
		res.status(500).end();
	}
	else{
		console.log(req.query);
		if (req.query.byModel==='true'){
			ctrlMCDimension.getOneByModelId(req.params.id,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end('not found');
				else res.status(200).end(JSON.stringify(data));
			});
		}
		else{
			ctrlMCDimension.getOneById(req.params.id,function(err,data){
				if (err || !data) res.status(500).end(JSON.stringify(err));
				else res.status(200).end(JSON.stringify(data));
			});
		}
	}
});

router.post('/dimension/:id',function(req,res){
	if (req.params.id==='update'){
		var id=req.body.dimension.id;
		delete req.body.dimension.id;
		if (!id)
			ctrlMCDimension.addOne(req.body.dimension,function(err,data){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!data) res.status(500).end();
				else res.status(200).end(JSON.stringify(data));
			});
		else
			ctrlMCDimension.updateOneById(id,req.body.dimension,function(err,data){
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
