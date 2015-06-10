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
	else if (req.params.id==='byname'){
		ctlTodolist.findByName(req.query.name,function(err,category){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (category===null)
				res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(category));
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
	ctlTodolist.deleteOneById(req.params.id,function(err){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.status(200).end();	
	});
});

router.post('/todolist/category/:id',function(req,res){
	if (req.params.id==='update'){
		ctlTodolist.updateOneById(req.body.category._id,req.body.category.name,req.body.category.description,function(err,category){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(category));
		});
	}
	else if(req.params.id==='add'){
		ctlTodolist.addCategory(req.body.category.name,req.body.category.description,function(err,category){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.end(JSON.stringify(category));
		});
	}
});

router.get('/todolist/categories',function(req,res){
	ctlTodolist.getCategories(function(err,categories){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.end(JSON.stringify(categories));
	});
});

module.exports=router;
