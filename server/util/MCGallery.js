'use strict';

var fs=require('fs');
var gm=require('gm');
var path=require('path');

function updateSizedFile(fileName,callback){
	var imgSize=JSON.parse(fs.readFileSync(path.join(__dirname,'galleryImageSize.json'),'utf8'));
	var f_dir=path.dirname(fileName);
	var f_ext=path.extname(fileName);
	var f_name=path.basename(fileName,f_ext);
	var pos=f_name.indexOf('_');
	try{
		if (pos!==-1){
			var f_orgname=f_name.substr(0,pos);
			var f_size=f_name.slice(pos+1);
			console.log(f_orgname);
			console.log(f_size);
			console.log(imgSize[f_size]);
			var orgFileName=f_dir+'/'+f_orgname+f_ext;
			fs.accessSync(orgFileName);
			if (imgSize[f_size]){
				gm(orgFileName)
				.resize(imgSize[f_size],imgSize[f_size])
				.write(fileName,function(err){
					if (err)
						callback(err);
					else
						callback(null);
				});
			}
			else{
				throw new Error('No Size found in FileName.');
			}
		}
		else{
			throw new Error('No Size found in FileName.');
		}
	}
	catch (err){
		console.log(err);
		callback(err);
	}
};

module.exports={
	updateSizedFile:updateSizedFile,
};
