'use strict';

todolistControllers.controller('TodolistAddCtrl',
	['$scope','TDTodoSvc',
	function($scope,TDTodoSvc){
		$scope.todo={
			dueDate:''
		};

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

		$scope.today=function(){
			$scope.dt=new Date();
			$scope.dt=$scope.dt.setDate($scope.dt.getDate()+8);
			$scope.todo.dueDate=$scope.dt;
		};

		$scope.today();

		$scope.minDate=new Date();
		$scope.minDate=$scope.minDate.setDate($scope.minDate.getDate()+1);

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

	}]);
