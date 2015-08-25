'use strict';

var svcMCPic=require('../service/svcMCPic');
var fs=require('fs');
var path=require('path');

function addOne(fileName,callback){
	svcMCPic.addOne(fileName,callback);
};

function getPic(fileName,res){
	var r=fs.createReadStream(path.join(__dirname,'../pics/'+fileName));
	r.pipe(res);	
};

module.exports={
	addOne:addOne,
	getPic:getPic,
};
