'use strict';

var fs=require('fs');
var path=require('path');

var setting={
	db:JSON.parse(fs.readFileSync(path.join(__dirname,'./cfgDbSetting.json')),'utf8'),
	imageLib:JSON.parse(fs.readFileSync(path.join(__dirname,'cfgImageLib.json')),'utf8')
};

module.exports=setting;

