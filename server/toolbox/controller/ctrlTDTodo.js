var svcTDTodo=require('../service/svcTDTodo');

function getAll(page,abandon,done,callback){
	svcTDTodo.getAll(page,10,abandon,done,callback);
};

function getCount(callback){
	svcTDTodo.getCount(callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
};

exports._getTodos=function(page,abandon,done,callback){
	svcTDTodo.getTodos(page,abandon,done,callback);
};

exports._getCount=function(callback){
	svcTDTodo.getCount(callback);
};

exports._getOne=function(id,callback){
	svcTDTodo.getOne(id,callback);
};

exports._addOne=function(todo,callback){
	svcTDTodo.addOne(todo.shortDesc,todo.description,todo.creator,todo.dateDue,todo.category,todo.priority,callback);
};

exports._update=function(todo,callback){
	svcTDTodo.update(todo._id,todo.description,todo.dateDue,todo.priority,callback);
};

exports._abandon=function(id,callback){
	svcTDTodo.abandon(id,callback);
};

exports._done=function(id,callback){
	svcTDTodo.done(id,callback);
};

exports._deleteTodoById=function(id,callback){
	svcTDTodo.deleteTodoById(id,callback);
};
