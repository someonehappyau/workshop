'use strict';

var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlMCOrigin=require('../mc/controller/ctrlMCOrigin');
var imageFromPage=require('../util/imageFromPage');
var url=require('url');
var saveImageFromUrl=require('../util/saveImageFromUrl');

router.get('/mco/:id',function(req,res){
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
		ctrlMCOrigin.getAll(page,searchStr,function(err,mcs){
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

		ctrlMCOrigin.getCount(searchStr,function(err,count){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!count) res.status(200).end(JSON.stringify());
			else res.status(200).end(JSON.stringify({count:count}));
		});
	}
	else if (req.params.id==='imageFromPage'){
		console.log(req.query);
		imageFromPage.getList(url.resolve(req.query.urlMaker,req.query.urlModel),function(err,response,result){
			var data={
					err:err,
					res:response,
					result:result
				};
			console.log(data);
			res.status(200).end(JSON.stringify(data));
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
		ctrlMCOrigin.updateOneById(req.body.mcoid,req.body.mcFinal,function(err,mc){
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
