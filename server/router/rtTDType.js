var express=require('express');
var router=express.Router();
var ctrlTDType=require('../toolbox/controller/ctrlTDType');

ctrlTDType.initialize();

router.get('/todolist/:typeName/:id',function(req,res){
	if (req.params.id==='list'){
		ctrlTDType.getTDTypes(req.params.typeName,function(err,types){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(types));
		});
	}
	else if (req.params.id==='byname'){
		ctrlTDType.getTDTypeByName(req.params.typeName,req.query.name,function(err,type){
			if (err) 
				res.status(500).end(JSON.stringify(err));
			else if (type===null)
				res.status(500).end(JSON.stringify(err));
			else 
				res.end(JSON.stringify(type));
		});
	}
	else{
		ctrlTDType.getTDTypeById(req.params.typeName,req.params.id,function(err,type){
			if(err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(type));
		});		
	}

});

router.delete('/todolist/:typeName/:id',function(req,res){
	ctrlTDType.deleteTDTypeById(req.params.typeName,req.params.id,function(err){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.status(200).end();	
	});
});

router.post('/todolist/:typeName/:id',function(req,res){
	if (req.params.id==='update'){
		ctrlTDType.updateTDTypeById(req.params.typeName,req.body.type._id,req.body.type.name,req.body.type.description,function(err,type){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(type));
		});
	}
	else if(req.params.id==='add'){
		ctrlTDType.addTDType(req.params.typeName,req.body.type.name,req.body.type.description,function(err,type){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(type));
		});
	}
});

module.exports=router;
