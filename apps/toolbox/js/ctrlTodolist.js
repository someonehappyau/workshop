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
					$scope.todos=[];
				});
			};

			$scope.updateTDTodos();

			$scope.addOne=function(){
				$location.path('/addtodo');
			};

			$scope.editTodo=function(id){
				$location.path('/edittodo/'+id);
			};

			$scope.deleteTodo=function(todoid){
				showMsgBox($modal,'Please confirm you want to delete this item.',true,true,
					function(result){
						var todo=new TDTodoSvc();
						todo.$delete({id:todoid}).then(function(result){
							$scope.updateTDTodos();
						},
						function(result){
							console.log(result);
						});
					},
					function(result){
						//Cancel
					});
			};
		}]);


