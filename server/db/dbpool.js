var mysql=require('mysql');
var pool=mysql.createPool({
	connectionLimit	:2,
    	host		:'localhost',
    	user		:'worker',
    	password	:'woshigongren',
    	database	:'workshop'
});

module.exports=pool;
