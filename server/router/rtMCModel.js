'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCModel=require('../mc/controller/ctrlMCModel');

router.get('/model/:id',function(req,res){
	if (req.params.id==='list'){
		var page;
		if (!req.query.page)
			page=1;
		else
			page=req.query.page;

		var searchStr;
		if (!req.query.searchStr)
			searchStr='';
		else
			searchStr=req.query.searchStr;

		console.log(page);
		ctrlMCModel.getAll(page,searchStr,function(err,mcs){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!mcs) res.status(200).end(JSON.stringify());
			else res.status(200).end(JSON.stringify(mcs));
		});
	}
	else if (req.params.id==='count'){
		var searchStr;
		if (!req.query.searchStr)
			searchStr='';
		else
			searchStr=req.query.searchStr;

		ctrlMCModel.getCount(searchStr,function(err,count){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!count) res.status(200).end(JSON.stringify());
			else res.status(200).end(JSON.stringify({count:count}));
		});
	}
	else if (req.params.id==='gallery'){
		ctrlMCModel.getGallery(req.query.mcid,function(err,imgs){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!imgs) res.status(200).end(JSON.stringify([]));
			else res.status(200).end(JSON.stringify(imgs));
		});
	}
	else{
		ctrlMCModel.getOneById(req.params.id,function(err,mc){
			if (err || !mc) res.status(500).end(JSON.stringify(err));
			else{
				res.status(200).end(JSON.stringify(mc));
			}
		});
	}
});

router.post('/model/:id',function(req,res){
	if (req.params.id==='update'){
		console.log(req.body.model);
		var id=req.body.model.id;
		delete req.body.model.id;
		console.log(req.body.model);
		if (!id)
			ctrlMCModel.addOne(req.body.model,function(err,mc){
				if (err) res.status(500).end(JSON.stringify(err));
				else if (!mc) res.status(500).end();
				else{
				       	res.status(200).end(JSON.stringify(mc));
				}
			});
		else
			ctrlMCModel.updateOneById(id,req.body.model,function(err,mc){
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
