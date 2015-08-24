'use strict';

var svcMCPic=require('../service/svcMCPic');

function addOne(fileName,callback){
	svcMCPic.addOne(fileName,callback);
};

module.exports={
	addOne:addOne,
};
