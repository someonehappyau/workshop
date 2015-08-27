'use strict';

var mcGallery=require('../server/util/MCGallery');
var path=require('path');

mcGallery.updateSizedFile(path.join(__dirname,'../server/mc/pics/1440465602214N1QJG3E2_large_1.jpg'),function(err){
	if (err)
		console.log(err);
	else
		console.log('file updated.');

});
