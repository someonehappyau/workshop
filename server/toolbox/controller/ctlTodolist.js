var svcCategory=require('../service/svcCategory');

exports.getCategories=function(callback){
	svcCategory.getAll(function(err,categories){
		if (err) callback(err,null);
		else callback(null,categories);
	});
};

exports.getCategory=function(id, callback){
	svcCategory.getOneById(id,function(err,category){
		if (err) callback(err,null);
		else callback(null,category);
	});
};

exports.addCategory=function(name,desc,callback){
	svcCategory.addOne(name,desc,callback);
};

exports.updateCategory=function(id,name,desc,callback){
	svcCategory.updateOneById(id,name,desc,callback);
};
