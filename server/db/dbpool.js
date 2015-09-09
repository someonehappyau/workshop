'use strict';

var mysql=require('mysql');
var fs=require('fs');
var path=require('path');
var cfg=require('../cfg/cfg');

var setting=cfg.db;
var pool=mysql.createPool({
	connectionLimit	: 2,
    	host		: setting.host,
    	user		: setting.user,
    	password	: setting.password,
    	database	: setting.database
});

module.exports=pool;
