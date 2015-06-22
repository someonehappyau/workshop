'use strict';

toolboxControllers.controller('TodolistAddCtrl',
	['$scope','TDTodoSvc','TDTypeSvc','Session','isEdit','$routeParams',
	function($scope,TDTodoSvc,TDTypeSvc,Session,isEdit,$routeParams){
		
		$scope.getCategories=function(){
			TDTypeSvc.list({typeName:'TDCategory'}).$promise.then(function(types){
				console.log(types);
				if (!!types){
					$scope.categories=types;
					if (isEdit!==true)
						$scope.todo.category=types[0]._id;
				}
			});
		};
		$scope.getCategories();

		$scope.getPriorities=function(){
			TDTypeSvc.list({typeName:'TDPriority'}).$promise.then(function(types){
				if (!!types){
					$scope.priorities=types;
					if (isEdit!==true)
						$scope.todo.priority=types[2]._id;
				}
			});
		};
		$scope.getPriorities();

		$scope.reset=function(){
			$scope.todo={
				shortDesc:'',
				description:'',
				creator:Session.user._id,
				dateDue:'',
				category:'',
				priority:'',
			};



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
			},
			function(err){
				console.log(err);
			});
		};

		$scope.submitForm=function(){
			console.log($scope.todo);
			var svcTDTodo=new TDTodoSvc();
			svcTDTodo.todo=$scope.todo;
			if (isEdit===true){
				svcTDTodo.$update().then(function(todo){
					console.log('updated');
				},
				function(err){
					console.log(err);
				});
			}
			else{

				svcTDTodo.$addOne().then(function(todo){
					$scope.reset();
					console.log('submit');
				},
				function(err){
					console.log(err);
				});
			}
		};

		if (isEdit===true){
			$scope.title='Edit Todo';
			$scope.loadTodo();
		}
		else{
			$scope.title='New Todo';
			$scope.reset();
		}


		$scope.minDate=new Date();
		$scope.minDate=$scope.minDate.setDate($scope.minDate.getDate()+1);

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};


	}]);
