'use strict';

var todolistServices=angular.module('todolistServices',['ngResource']);

todolistServices.factory('TDTypeSvc',['$resource',function($resource){
	return $resource('/svcToolbox/todolist/:typeName/:id',{id:'list'},{
		list:{method:'GET',params:{id:'list'},isArray:true},
		add:{method:'POST',params:{id:'add'}},
		update:{method:'POST',params:{id:'update'}},
	    byname:{method:'GET',params:{id:'byname'}}
	});
}]);
