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
