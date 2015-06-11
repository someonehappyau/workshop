'use strict';

var toolboxApp=angular.module('toolboxApp',[
	'ngRoute',
	'ui.bootstrap',
	'toolboxControllers',
	'toolboxServices',
	'todolistControllers',
	'todolistServices'
]);

toolboxApp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/todolist',{
					templateUrl:'partials/todolist.html',
					controller:'TodolistCtrl'
				}).
				when('/todolist/config/:typeName',{
					templateUrl:'partials/TDConfig.html',
					controller:'TDTypeCtrl',
					resolve:{
						validation: function($q,$route){
							var deferred=$q.defer();
							var typeName=$route.current.params.typeName;
							if (typeName==='TDCategory' || 
							    typeName==='TDStatus'){
								deferred.resolve();
							    }
							else{
								deferred.reject('VALIDATION FAILED');
							}
							return deferred.promise;
						}
					}
								
				}).
				otherwise({
					redirectTo:'/todolist'
				});
		}]);

