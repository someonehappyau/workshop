var express=require('express');
var router=express.Router();
var ctrlUser=require('../toolbox/controller/ctrlUser');
var ctrlTDTodo=require('../toolbox/controller/ctrlTDTodo');

router.get('/todolist/:id',function(req,res){
	if(req.params.id==='list'){
		ctrlTDTodo.getTodos(function(err,todos){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!todos) res.status(200).end(JSON.stringify());
			else res.status(200).end(JSON.stringify(todos));
		});
	}
	else{
		ctrlTDTodo.getOne(req.params.id,function(err,todo){
			if (err || !todo) res.status(500).end(JSON.stringify(err));
			else{
				res.status(200).end(JSON.stringify(todo));
			}
		});
	}
});

router.post('/todolist/:id',function(req,res){
	if(req.params.id==='addOne'){
		console.log(req.body.todo);
		ctrlTDTodo.addOne(req.body.todo,function(err,todo){
			console.log(err);
			console.log(todo);
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!todo) res.status(500).end();
			else res.status(200).end(JSON.stringify(todo));
		});
	}
	else if (req.params.id==='update'){
		ctrlTDTodo.update(req.body.todo,function(err,todo){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!todo) res.status(500).end();
			else res.status(200).end(JSON.stringify(todo));
		});
	}
	else{
		res.status(404).end();
	}
});

router.delete('/todolist/:id',function(req,res){
	ctrlTDTodo.deleteTodoById(req.params.id,function(err){
		if (err) res.status(500).end(JSON.stringify(err));
		else res.status(200).end();
	});
});

module.exports=router;
