'use strict';

mcServices.factory('MCModelSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/model/:id',{id:'@id'},{
				list:{method:'GET',params:{id:'list'}},
				getCount:{method:'GET',params:{id:'count'}},
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);
			
