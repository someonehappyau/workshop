'use strict';

mcServices.factory('MCModelSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/model/:id',{id:'@id'},{
				list:{method:'GET',params:{id:'list'}},
				getCount:{method:'GET',params:{id:'count'}},
				getOne:{method:'GET'},
				getGallery:{method:'GET',params:{id:'gallery'},isArray:true},
				update:{method:'POST',params:{id:'update'} 
				}
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

mcServices.factory('MCFrameSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/frame/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCSuspensionSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/suspension/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCBrakeSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/brake/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCWheelSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/wheel/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCDimensionSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/dimension/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCDriveSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/drive/:id',{id:'@id'},{
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}}
			});
		}]);

mcServices.factory('MCPicSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/mcpic/:id',{id:'@id'},{
				addPics:{method:'POST',params:{id:'savePics'}},
				updatePositions:{method:'POST',params:{id:'updatePositions'}},
				deletePics:{method:'POST',params:{id:'deletePics'}}
			});
		}]);
