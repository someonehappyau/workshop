'use strict';

var express=require('express');
var router=express.Router();

var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCMaker=require('../mc/controller/ctrlMCMaker');

router.get('/maker/:id',ctrlUser.loggedIn,function(req,res){
	if (req.params.id==='list'){
		ctrlMCMaker.getAll(function(err,data){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(data));
		});
	}
	else if (req.params.id==='byLabel'){
		ctrlMCMaker.getOneByLabel(req.query.label,function(err,data){
			if (err || !data)
				res.status(500).end(JSON.stringify(err));
			else		
				res.status(200).end(JSON.stringify(data));
		});
	}
	else{
		ctrlMCMaker.getOneById(req.params.id,function(err,data){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.status(200).end(JSON.stringify(data));
		});
	}
});

router.post('/maker/:id',ctrlUser.loggedIn,function(req,res){
	console.log(req.body.mcmaker);
	if (req.params.id==='update'){
		ctrlMCMaker.updateOneById(req.body.mcmaker,function(err,data){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(data));
		});
	}
	else if (req.params.id==='add'){
		ctrlMCMaker.addOne(req.body.mcmaker,function(err,data){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.status(200).end(JSON.stringify(data));
		});
	}
});

module.exports=router;
