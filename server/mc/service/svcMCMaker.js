'use strict';

var pool=require('../../db/dbpool');

function getAll(callback){
	pool.query('select * from MCMakers',callback);
};

function getOneById(id,callback){
	pool.query('select * from MCMakers where id=?',[id],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function getOneByLabel(label,callback){
	pool.query('select * from MCMakers where label=?',[label],function(err,data){
		if (err || !data) callback(err,data);
		else{
			if (data.length>0)
				callback(null,data[0]);
			else
				callback(null,false);
		}
	});
};

function addOne(mcmaker,callback){
	var data={
		label:mcmaker.label,
		description:mcmaker.description,
		country:mcmaker.country,
		imageBrand:mcmaker.imageBrand,
		state:mcmaker.state
	};
	pool.query('insert into MCMaker set ?',[data],callback);
};

function updateOneById(mcmaker,callback){
	var data={
		label:mcmaker.label,
		description:mcmaker.description,
		state:mcmaker.state,
		country:mcmaker.country,
		imageBrand:mcmaker.imageBrand
	};
	pool.query('update MCMaker set ? where id=?',[data,mcmaker.id],callback);
};

module.exports={
	getAll:getAll,
	getOneById:getOneById,
	getOneByLabel:getOneByLabel,

	addOne:addOne,
	updateOneById:updateOneById,
};

