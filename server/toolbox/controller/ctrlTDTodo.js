var svcTDTodo=require('../service/svcTDTodo');

function getAll(page,normal,abandon,done,callback){
	svcTDTodo.getAll(page,10,normal,abandon,done,callback);
};

function getCount(normal,abandon,done,callback){
	svcTDTodo.getCount(normal,abandon,done,callback);
};

function getOneById(id,callback){
	svcTDTodo.getOneById(id,callback);
};

function addOne(todo,callback){
	var dateDue=new Date(todo.dateDue);
	svcTDTodo.addOne(todo.shortDesc,todo.description,todo.creator,dateDue,todo.category,todo.priority,callback);
};

function updateOneById(todo,callback){
	var dateDue=new Date(todo.dateDue);
	svcTDTodo.updateOneById(todo.id,todo.description,dateDue,todo.priority,callback);
};

function abandon(id,callback){
	svcTDTodo.abandon(id,callback);
};

function done(id, callback){
	svcTDTodo.done(id,callback);
};

function deleteOneById(id,callback){
	svcTDTodo.deleteOneById(id,callback);
};

module.exports={
	getAll:getAll,
	getCount:getCount,
	getOneById:getOneById,

	addOne:addOne,
	
	updateOneById:updateOneById,
	abandon:abandon,
	done:done,
	
	deleteOneById:deleteOneById,	
};

