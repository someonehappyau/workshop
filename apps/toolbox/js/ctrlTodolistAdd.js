'use strict';

todolistControllers.controller('TodolistAddCtrl',
	['$scope','TDTodoSvc',
	function($scope,TDTodoSvc){
		$scope.submitForm=function(){
			var svcTDTodo=new TDTodoSvc();
			$scope.todo={};
			svcTDTodo.todo=$scope.todo;
			svcTDTodo.$addOne().then(function(err,todo){
				console.log(err);
				console.log(todo);
				console.log('submit');
			});
		};
	}]);
