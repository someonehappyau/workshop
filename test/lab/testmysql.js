var mysql=require('mysql');

var sql='select ?? from ?? where id=? and name=?';
var inserts=[['a','b'],'tbl',1,'john'];
sql=mysql.format(sql,inserts);
console.log(sql);

