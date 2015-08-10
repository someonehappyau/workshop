'use strict';

mcServices.factory('UserSvc',['$resource',function($resource){
	return $resource('/toolbox/svcToolbox/toolbox/user/:id',{id:'@id'},{
		list:{method:'GET',params:{id:'list'},isArray:true},
	    byusername:{method:'GET',params:{id:'byusername'}},
		login:{method:'POST',params:{id:'login'}},
		logout:{method:'POST',params:{id:'logout'}},
		profile:{method:'POST',params:{id:'profile'}},
		register:{method:'POST',params:{id:'register'}},
		updatepassword:{method:'PUT',params:{id:'password'}},
		updatestatus:{method:'PUT',params:{id:'status'}}
	});
}]);
