'use strict';

var svcMCPic=require('../service/svcMCPic');
var fs=require('fs');
var path=require('path');
var async=require('async');
var cfg=require('../../cfg/cfg');

function addOne(fileName,callback){
	svcMCPic.addOne(fileName,callback);
};

function getPic(fileName,res){
	var r=fs.createReadStream(cfg.imageLib.model.web+fileName);
	r.on('open',function(){
		r.pipe(res);
	});
	r.on('error',function(err){
		res.status(404).end();
	});
};

function updatePositions(positions,callback){
	var suc=0,fail=0;
	async.each(positions,function(pos,cb){
		svcMCPic.updatePosition(pos,function(err,data){
			if (err)
				fail++;
			else if (data.affectedRows!==1)
				fail++;
			else
				suc++;
			cb();
		});
	},
	function(err){
		if (err){
			callback(err,null);
			console.log(err);
		}
		else{
			callback(null,{success:suc,fail:fail});
		}
	});
};

function updateStates(states,callback){
	var suc=0,fail=0;
	async.each(states,function(state,cb){
		svcMCPic.updateState(state,function(err,data){
			if (err)
				fail++;
			else if (data.affectedRows!==1)
				fail++;
			else
				suc++;
			cb();
		});
	},
	function(err){
		if (err){
			callback(err,null);
			console.log(err);
		}
		else{
			callback(null,{success:suc,fail:fail});
		}
	});
};

function deletePics(ids,callback){
	var suc=0,fail=0;
	async.each(ids,function(id,cb){
		svcMCPic.deletePic(id,function(err,data){
			if (err)
				fail++;
			else if (data.affectedRows!==1)
				fail++;
			else
				suc++;
			cb();
		});
	},
	function(err){
		if(err){
			callback(err,null);
			console.log(err);
		}
		else{
			callback(null,{success:suc,fail:fail});
		}
	});
};

module.exports={
	addOne:addOne,
	getPic:getPic,
	
	updatePositions:updatePositions,
	updateStates:updateStates,
	deletePics:deletePics,
};
