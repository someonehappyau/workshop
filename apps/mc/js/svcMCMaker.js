'use strict';

mcServices.factory('MCMakerSvc',['$resource',
		function($resource){
			return $resource('/mc/svcMC/maker/:id',{id:'list'},{
				list:{method:'GET',params:{id:'list'},isArray:true},
				byname:{method:'GET',params:{id:'byLabel'}},
				add:{method:'POST',params:{id:'add'}},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);
