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
					controller:'TDTypeCtrl'
				}).
				otherwise({
					redirectTo:'/todolist'
				});
		}]);

