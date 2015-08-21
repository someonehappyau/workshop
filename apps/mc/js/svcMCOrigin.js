'use strict';

mcServices.factory('MCOriginSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMCO/mco/:id',{id:'@id'},{
				list:{method:'GET',params:{id:'list'}},
				getCount:{method:'GET',params:{id:'count'}},
				getOne:{method:'GET'},
				imageFromPage:{method:'GET',params:{id:'imageFromPage'}},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);
			
