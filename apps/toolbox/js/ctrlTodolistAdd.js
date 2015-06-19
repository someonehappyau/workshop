'use strict';

todolistControllers.controller('TodolistAddCtrl',
	['$scope','TDTodoSvc','TDTypeSvc','Session',
	function($scope,TDTodoSvc,TDTypeSvc,Session){
		$scope.todo={
			shortDesc:'',
			description:'',
			creator:Session.user._id,
			dueDate:'',
			category:'',
			priority:'',
		};

		$scope.submitForm=function(){
			console.log($scope.todo);
			return;
			var svcTDTodo=new TDTodoSvc();
			$scope.todo={};
			svcTDTodo.todo=$scope.todo;
			svcTDTodo.$addOne().then(function(err,todo){
				console.log(err);
				console.log(todo);
				console.log('submit');
			});
		};

		$scope.getCategories=function(){
			TDTypeSvc.list({typeName:'TDCategory'}).$promise.then(function(types){
				console.log(types);
				if (!!types){
					$scope.categories=types;
					$scope.todo.category=types[0]._id;
				}
			});
		};
		$scope.getCategories();

		$scope.getPriorities=function(){
			TDTypeSvc.list({typeName:'TDPriority'}).$promise.then(function(types){
				if (!!types){
					$scope.priorities=types;
					$scope.todo.priority=types[2]._id;
				}
			});
		};
		$scope.getPriorities();

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
