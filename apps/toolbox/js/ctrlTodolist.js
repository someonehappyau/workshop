'use strict';

toolboxControllers.controller('TodolistCtrl',['$scope','TDTodoSvc', '$modal','$rootScope','$location','DetailDlgSvc',
		function($scope,TDTodoSvc,$modal,$rootScope,$location,DetailDlgSvc){
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

			$scope.showDetail=function(todoid){
				TDTodoSvc.getOne({id:todoid}).$promise.then(function(todo){
					console.log(todo);
					DetailDlgSvc.showDetail({
						title:'Todo',
						'Short Description':todo.shortDesc,
						'Category':todo.category.name,
						'Due Date':todo.dateDue,
						'Priority':todo.priority.name,
						'Creation Date':todo.dateCreated,
						'Created By':todo.creator.username,
						'Description':todo.description
					});
				},
				function(err){
					console.log(err);
				});
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


