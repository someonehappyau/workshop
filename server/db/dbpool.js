'use strict';

var mysql=require('mysql');
var fs=require('fs');
var path=require('path');

var setting=JSON.parse(fs.readFileSync(path.join(__dirname,'dbSetting.json')),'utf8');
var pool=mysql.createPool({
	connectionLimit	: 2,
    	host		: setting.host,
    	user		: setting.user,
    	password	: setting.password,
    	database	: setting.database
});

module.exports=pool;
