'use strict';

var winston=require('winston');
var logger=new (winston.Logger)({
	transports:[
		new (winston.transports.Console)({
		      timestamp: function() {
							         return Date.now();
									       },
			      formatter: function(options) {
								         // Return string will be passed to logger.
								                  return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
								                            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
								                                  }
		})
	]
});

logger.info('hi.. %j',{number:123},{number:123});

