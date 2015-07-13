var pool=require('../../db/dbpool');

function getAll(configName, callback){
	pool.query('select * from ??',[configName],callback);
};

function getOneById(configName,id,callback){
	pool.query('select * from ?? where id=?',[configName,id],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function getOneByLabel(configName, label, callback){
	pool.query('select * from ?? where label=?',[configName,label],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function addOne(configName, label, desc, callback){
	var config={label:label,description:desc};
	pool.query('insert into ?? set ?',[configName,config],callback);
};

function updateOneById(configName,id,label,desc,callback){
	var config={label:label,description:desc};
	pool.query('update ?? set ? where id=?',[configName,config,id],callback);
};

function deleteOneById(configName, id, callback){
	pool.query('delete from ?? where id=?',[configName, id],callback);
};

module.exports={
	getAll:getAll,
	getOneById:getOneById,
	getOneByLabel:getOneByLabel,

	addOne:addOne,
	updateOneById:updateOneById,
	deleteOneById:deleteOneById,
};
