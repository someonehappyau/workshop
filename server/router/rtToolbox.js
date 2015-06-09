var express=require('express');
var router=express.Router();
var ctlTodolist=require('../toolbox/controller/ctlTodolist');

router.get('/todolist/category/:id',function(req,res){
	if (req.params.id==='list'){
		ctlTodolist.getCategories(function(err,categories){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(categories));
		});
	}
	else{
		ctlTodolist.getCategory(req.params.id,function(err,category){
			if(err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(category));
		});		
	}

});

router.delete('/todolist/category/:id',function(req,res){
	ctlTodolist.findByIdAndRemove(req.params.id,function(err){
		if (err) res.status(500).end(err);
		else res.status(200).end();	
	});
});

router.post('/todolist/category/:id',function(req,res){
	console.log(req.params);
	console.log(req.body);
	console.log(req.query);
	//console.log(req);
	res.end();
	return;
	if (req.params.id==='update'){
		ctlTodolist.updateOneById(req.params.id,req.body.name,req.body.description,function(err,category){
			if (err) res.status(500).end(err);
			else res.end(category);
		});
	}
	else if(req.params.id==='add'){
		ctlTodolist.addCategory(req.body.name,req.body.description,function(err,category){
			if (err) res.status(500).end(err);
			else res.end(JSON.stringify(category));
		});
	}
});

router.get('/todolist/categories',function(req,res){
	//res.end('hi');
	ctlTodolist.getCategories(function(err,categories){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.end(JSON.stringify(categories));
	});
});

module.exports=router;
