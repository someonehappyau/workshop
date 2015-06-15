'use strict';

toolboxServices.factory('UserSvc',['$resource',function($resource){
	return $resource('/svcToolbox/todolist/user/:id',{id:'@id'},{
		list:{method:'GET',params:{id:'list'},isArray:true},
	    byusername:{method:'GET',params:{id:'byusername'}},
		login:{method:'POST',params:{id:'login'}},
		register:{method:'POST',params:{id:'register'}},
		updatepassword:{method:'PUT',params:{id:'password'}},
		updatestatus:{method:'PUT',params:{id:'status'}}
	});
}]);
