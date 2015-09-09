'use strict';
var request=require('request');
var fs=require('fs');
var shortid=require('shortid');
var path=require('path');

function getFileName(){
	var fileName;
	var now=new Date();
	
	fileName=now.getTime()+shortid.generate();
	console.log(fileName);
	
	return fileName;
};

function save(url,desPath,callback){
	var fileName=getFileName()+path.extname(url);
	var des=fs.createWriteStream(path.join(desPath,fileName));
	request(url)
	.pipe(des)
	.on('finish',function(){
		console.log(url+' save successfully.');
		callback(null,fileName);
	})
	.on('error',function(error){
		console.log(error);
		callback(error,null);
	});
};

module.exports={
	getFileName:getFileName,
	save:save
};
