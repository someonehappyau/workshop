'use strict';

var todolistControllers=angular.module('todolistControllers',[]);

todolistControllers.controller('TodolistCtrl',['$scope','TDTodoSvc', '$modal','$rootScope','$location',
		function($scope,TDTodoSvc,$modal,$rootScope,$location){
			$scope.updateTDTodos=function(){
				TDTodoSvc.list().$promise.then(function(todos){
					$scope.todos=todos;
				},
				function(err){
					console.log(err);
					$scope.todos={};
				});
			};

			$scope.updateTDTodos();

			$scope.addOne=function(){
				$location.path('/addtodo');
			};
		}]);


