'use strict';
var request=require('request');
var cheerio=require('cheerio');
var urlHandler=require('url');

function getList(url,callback){
	request(url,function(err,res,body){
		var result=[];
		if (!err && res.statusCode===200){
			var $=cheerio.load(body);
			var imgs=$('img');
			for (var i=0;i<imgs.length;i++){
				//console.log(imgs[i].attribs.src);
				if (imgs[i].attribs.src.indexOf('../../_borders')===0){
				}
				else if (imgs[i].attribs.src.indexOf('../../../../template')===0){
				}
				else{
					var imgsrc=urlHandler.resolve('http://www.motorcyclespecs.co.za/model/',imgs[i].attribs.src);
					if (result.indexOf(imgsrc)===-1){
						result.push(imgsrc);
					}
				}
			}
		}
		callback(err,res.statusCode,result);
	});
};

module.exports={
	getList:getList,
};
	
