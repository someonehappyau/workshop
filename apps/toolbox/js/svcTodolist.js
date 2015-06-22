'use strict';

toolboxServices.factory('TDTodoSvc',
		['$resource',
		function($resource){
			return $resource('/toolbox/svcTodolist/todolist/:id',{id:'@id'},{
				list:{method:'GET',params:{id:'list'},isArray:true},
				getOne:{method:'GET'},
				update:{method:'POST',params:{id:'update'}},
				addOne:{method:'POST',params:{id:'addOne'}},
			});
		}]);
