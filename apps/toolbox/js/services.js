var toolboxServices=angular.module('toolboxServices',['ngResource']);

toolboxServices.factory('TDCategorySvc',['$resource',function($resource){
	return $resource('/svcToolbox/todolist/category/:id',{id:'list'},{
		list:{method:'GET',params:{id:'list'},isArray:true},
		add:{method:'POST',params:{id:'add'}},
		update:{method:'POST',params:{id:'update'}}
	});
}]);
