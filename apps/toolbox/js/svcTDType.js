'use strict';

toolboxServices.factory('TDTypeSvc',['$resource',function($resource){
	return $resource('/toolbox/svcTodolist/todolist/config/:typeName/:id',{id:'list'},{
		list:{method:'GET',params:{id:'list'},isArray:true},
		add:{method:'POST',params:{id:'add'}},
		update:{method:'POST',params:{id:'update'}},
	    byname:{method:'GET',params:{id:'byLabel'}}
	});
}]);
