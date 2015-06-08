var toolboxServices=angular.module('toolboxServices',['ngResource']);

toolboxServices.factory('TDCategorySvc',['$resource',function($resource){
	return $resource('/svcToolbox/todolist/category/:id',{id:'list'},{
		list:{method:'GET',isArray:true}
	});
}]);
