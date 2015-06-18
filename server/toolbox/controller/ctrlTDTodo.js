var svcTDTodo=require('../service/svcTDTodo');

exports.getTodos=function(callback){
	svcTDTodo.getTodos(callback);
};

exports.addOne=function(todo,callback){
	svcTDTodo.addOne(todo.shortDesc,todo.description,todo.creator,todo.dateDue,todo.category,todo.priority,todo.status,callback);
};
