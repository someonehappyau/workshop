var mongoose=require('mongoose');
var schemaType=require('./schemaTDType');

module.exports=function(typeName){
	if (itemExisted(mongoose.modelNames(),typeName)===false)
		return mongoose.model(typeName,schemaType);
	else
		return mongoose.model(typeName);
};

function itemExisted(arr,item){
	for(var i=0;i<arr.length;i++){
		if (item===arr[i])
			return true;
	}
	return false;
};

