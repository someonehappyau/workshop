var svcConfig=require('../service/svcConfig');

function getAll(configName, callback){
	svcConfig.getAll(configName,callback);
};

function getOneById(configName,id,callback){
	svcConfig.getOneById(configName,id,callback);
};

function getOneByLabel(configName,label,callback){
	svcConfig.getOneByLabel(configName,label,callback);
};

function addOne(configName,label,desc,callback){
	svcConfig.addOne(configName,label,desc,callback);
};

function updateOneById(configName,id,label,desc,callback){
	svcConfig.updateOneById(configName,id,label,desc,callback);
};

function deleteOneById(configName, id, callback){
	svcConfig.deleteOneById(configName,id,callback);
};

module.exports={
	getAll:getAll,
	getOneById:getOneById,
	getOneByLabel:getOneByLabel,
	
	addOne:addOne,
	updateOneById:updateOneById,
	deleteOneById:deleteOneById,
};
