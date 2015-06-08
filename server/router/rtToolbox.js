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
		if (err) 
	});
});

router.get('/todolist/categories',function(req,res){
	//res.end('hi');
	ctlTodolist.getCategories(function(err,categories){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.end(JSON.stringify(categories));
	});
});

module.exports=router;
