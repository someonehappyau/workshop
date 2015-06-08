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
