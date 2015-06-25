var svcTDTodo=require('../service/svcTDTodo');

exports.getTodos=function(page,callback){
	svcTDTodo.getTodos(page,callback);
};

exports.getCount=function(callback){
	svcTDTodo.getCount(callback);
};

exports.getOne=function(id,callback){
	svcTDTodo.getOne(id,callback);
};

exports.addOne=function(todo,callback){
	svcTDTodo.addOne(todo.shortDesc,todo.description,todo.creator,todo.dateDue,todo.category,todo.priority,callback);
};

exports.update=function(todo,callback){
	svcTDTodo.update(todo._id,todo.description,todo.dateDue,todo.priority,callback);
};

exports.abandon=function(id,callback){
	svcTDTodo.abandon(id,callback);
};

exports.done=function(id,callback){
	svcTDTodo.done(id,callback);
};
exports.deleteTodoById=function(id,callback){
	svcTDTodo.deleteTodoById(id,callback);
};
