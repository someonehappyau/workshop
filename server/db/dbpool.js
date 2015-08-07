var mysql=require('mysql');
var pool=mysql.createPool({
	connectionLimit	:2,
    	host		:'localhost',
    	user		:'workshop',
    	password	:'Woshigongren',
    	database	:'workshop'
});

module.exports=pool;
