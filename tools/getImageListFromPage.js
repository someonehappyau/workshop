var imageFromPage=require('../server/util/imageFromPage');

imageFromPage.getList('http://motorcyclespecs.co.za/model/AC%20Schnitzer/ac_schnitzer_f_650cs.htm',function(err,res,result){
			console.log(err);
			console.log(res);
			console.log(result);
		});

