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
		res.status(404).end();
	}
});

router.post('/todolist/:id',function(req,res){
	if(req.params.id==='addOne'){
		ctrlTDTodo.addOne(req.body.todo,function(err,todo){
			if (err) res.status(500).end(JSON.stringify(err));
			else if (!todo) res.status(500).end();
			else res.status(200).end(JSON.stringify(todo));
		});
	}
	else{
		res.status(404).end();
	}
});

module.exports=router;
