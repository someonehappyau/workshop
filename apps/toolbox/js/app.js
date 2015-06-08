'use strict';

var toolboxApp=angular.module('toolboxApp',[
	'ngRoute',
	'ui.bootstrap',
	'toolboxControllers',
	'toolboxServices'
]);

toolboxApp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/todolist',{
					templateUrl:'partials/todolist.html',
					controller:'TodolistCtrl'
				}).
				otherwise({
					redirectTo:'/todolist'
				});
		}]);

