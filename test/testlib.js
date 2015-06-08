var typeHandler=require('../server/toolbox/model/Type');

var Type=typeHandler('Type');

exports.fn=function(done){
	    Type.find(function(err,types){
					        done(err,types);
							    });
};

