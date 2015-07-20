'use strict';

toolboxControllers.controller('TodolistAddCtrl',
	['$scope','TDTodoSvc','TDTypeSvc','Session','isEdit','$routeParams','$timeout',
	function($scope,TDTodoSvc,TDTypeSvc,Session,isEdit,$routeParams,$timeout){
		
		$scope.getCategories=function(){
			TDTypeSvc.list({typeName:'TDCategory'}).$promise.then(function(types){
				console.log(types);
				if (!!types){
					$scope.categories=types;
					if (isEdit!==true)
						$scope.todo.category=types[0].id;
				}
			});
		};
		$scope.getCategories();

		$scope.getPriorities=function(){
			TDTypeSvc.list({typeName:'TDPriority'}).$promise.then(function(types){
				if (!!types){
					$scope.priorities=types;
					if (isEdit!==true)
						$scope.todo.priority=types[2].id;
				}
			});
		};
		$scope.getPriorities();

		$scope.reset=function(){
			$scope.todo={
				shortDesc:'',
				description:'',
				creator:Session.user.id,
				dateDue:'',
				category:'',
				priority:'',
			};

			$scope.getCategories();

			$scope.getPriorities();

			$scope.today=function(){
				$scope.dt=new Date();
				$scope.dt=$scope.dt.setDate($scope.dt.getDate()+8);
				$scope.todo.dateDue=$scope.dt;
			};

			$scope.today();

		};

		$scope.loadTodo=function(){
			TDTodoSvc.getOne({id:$routeParams.id}).$promise.then(function(todo){
				console.log(todo);
				$scope.todo=todo;
				//$scope.todo.category=todo.category.id;
				//$scope.todo.priority=todo.priority.id;
			},
			function(err){
				console.log(err);
			});
		};

		$scope.resetMsg=function(){
			$scope.msg='';
			$scope.msgStyle='';
		};

		$scope.submitForm=function(){
			console.log($scope.todo);
			var svcTDTodo=new TDTodoSvc();
			svcTDTodo.todo=$scope.todo;
			if (isEdit===true){
				svcTDTodo.$update().then(function(todo){
					console.log('updated');
					$scope.msg='Update Successfully!';
					$timeout($scope.resetMsg,3000);
					$scope.msgStyle='alert-success';
				},
				function(err){
					console.log(err);
					$scope.msg=err.statusText;
					$scope.msgStyle='alert-danger';
				});
			}
			else{

				svcTDTodo.$addOne().then(function(todo){
					$scope.msg='Add new Todo Successfully!';
					$scope.msgStyle='alert-success';
					$scope.reset();
					$timeout($scope.resetMsg,3000);
					console.log('submit');
				},
				function(err){
					console.log(err);
					$scope.msg=err.statusText;
					$scope.msgStyle='alert-danger';
				});
			}
		};

		if (isEdit===true){
			$scope.title='Edit Todo';
			$scope.loadTodo();
			$scope.categoryIsDisabled=true;
		}
		else{
			$scope.title='New Todo';
			$scope.reset();
			$scope.categoryIsDisabled=false;
		}


		$scope.minDate=new Date();
		$scope.minDate=$scope.minDate.setDate($scope.minDate.getDate()+1);

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};


	}]);
