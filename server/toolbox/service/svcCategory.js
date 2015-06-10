var Category=require('../model/TDCategory');

exports.addOne=function(name,desc,callback){
	(new Category)._addOne(Category.modelName,name,desc,callback);
};

exports.getAll=function(callback){
	(new Category)._getAll(Category.modelName,callback);
};

exports.getOneById=function(id,callback){
	(new Category)._getOneById(Category.modelName,id,callback);
};

exports.newOne=function(name,desc,callback){
	(new Category)._newOne(Category.modelName,name,desc,callback);
};

exports.updateOneById=function(id,name,desc,callback){
	(new Category)._updateOneById(Category.modelName,id,name,desc,callback);
};

exports.deleteOneById=function(id,callback){
	(new Category)._deleteOneById(Category.modelName,id,callback);
};

exports.findByName=function(name,callback){
	(new Category)._findByName(Category.modelName,name,callback);
};
