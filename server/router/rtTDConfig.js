var express=require('express');
var router=express.Router();

var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlConfig=require('../toolbox/controller/ctrlConfig');

router.get('/todolist/config/:configName/:id',ctrlUser.loggedIn,function(req,res){
	if (req.params.id==='list'){
		ctrlConfig.getAll(req.params.configName,function(err,configs){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(configs));
		});
	}
	else if (req.params.id==='byLabel'){
		ctrlConfig.getOneByLabel(req.params.configName, req.query.label,function(err,config){
			if (err || !config)
				res.status(500).end(JSON.stringify(err));
			else
				res.end(JSON.stringify(config));
		});
	}
	else{
		ctrlConfig.getOneById(req.params.configName,req.params.id,function(err,config){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(config));
		});
	}
});

router.delete('/todolist/config/:configName/:id',ctrlUser.loggedIn,function(req,res){
	ctrlConfig.deleteOneById(req.params.configName,req.params.id,function(err){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.status(200).end();
	});
});

router.post('/todolist/config/:configName/:id',ctrlUser.loggedIn,function(req,res){
	if (req.params.id==='update'){
		ctrlConfig.updateOneById(req.params.configName,req.body.config.id,req.body.config.label,req.body.config.description,function(err,config){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(config));
		});
	}
	else if (req.params.id==='add'){
		ctrlConfig.addOne(req.params.configName,req.body.config.label,req.body.config.description,function(err,config){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(config));
		});
	}
});


module.exports=router;

