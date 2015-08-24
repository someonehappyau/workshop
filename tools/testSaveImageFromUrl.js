var saveImageFromUrl=require('../server/util/saveImageFromUrl');

saveImageFromUrl.save('http://www.motorcyclespecs.co.za/Gallery%20B/BMW%20K1300R%2013%20%201.jpg','../server/mc/pics/',function(err){
		if (err) console.log(err);
		else console.log('done!');
		});

