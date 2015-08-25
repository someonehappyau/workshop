'use strict';

mcServices.factory('MCModelSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/model/:id',{id:'@id'},{
				list:{method:'GET',params:{id:'list'}},
				getCount:{method:'GET',params:{id:'count'}},
				getOne:{method:'GET'},
				getGallery:{method:'GET',params:{id:'gallery'},isArray:true},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);
			

mcServices.factory('MCEngineSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/engine/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCPicSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/mcpic/:id',{id:'@id'},{
				addOne:{method:'POST',params:{id:'savePics'}}
			});
		}]);
