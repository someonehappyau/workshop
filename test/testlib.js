var Type=require('../server/toolbox/service/svcType');

exports.fn=function(done){
	    Type.getAll(function(err,types){
					        done(err,types);
							    });
};

