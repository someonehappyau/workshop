'use strict';

toolboxControllers.controller('TodolistCtrl',['$scope','TDTodoSvc', '$modal','$rootScope','$location','DetailDlgSvc','$filter',
		function($scope,TDTodoSvc,$modal,$rootScope,$location,DetailDlgSvc,$filter){
			$scope.updateTDTodos=function(){
				TDTodoSvc.list().$promise.then(function(todos){
					$scope.todos=todos;
					$scope.currentPage=1;
				},
				function(err){
					console.log(err);
					$scope.todos=[];
				});
			};

			$scope.updateTDTodos();
		
			$scope.updateCount=function(){
				TDTodoSvc.getCount().$promise.then(function(count){
					$scope.totalItems=count.count;
				},
				function(err){
					console.log(err);
					$scope.totalItems=-1;
				});
			};
			$scope.updateCount();

			$scope.pageChanged=function(){
				console.log($scope.currentPage);
				TDTodoSvc.list({page:$scope.currentPage}).$promise.then(function(todos){
					$scope.todos=todos;
				},
				function(err){
					console.log(err);
					$scope.todos=[];
				});

				$scope.updateCount();
			};

			$scope.addOne=function(){
				$location.path('/todolist/addOne');
			};

			$scope.editTodo=function(id){
				$location.path('/edittodo/'+id);
			};

			$scope.showDetail=function(todoid){
				TDTodoSvc.getOne({id:todoid}).$promise.then(function(todo){
					console.log(todo);
					DetailDlgSvc.showDetail('Todo',
						{
						'Short Description':todo.shortDesc,
						'Category':todo.category.name,
						'Due Date':todo.dateDue,
						'Priority':todo.priority.name,
						'Last Modified At':$filter('date')(todo.dateUpdated,'yyyy-MM-dd HH:mm:ss','+1000'),
						'Creation Date':$filter('date')(todo.dateCreated,'yyyy-MM-dd HH:mm:ss','+1000'),
						'Created By':todo.creator.username,
						'Description':todo.description
					});
				},
				function(err){
					console.log(err);
				});
			};

			$scope.abandonTodo=function(todoid){
				showMsgBox($modal,'Please confirm you want to abandon this item.',true,true,
					function(result){
						var todo=new TDTodoSvc();
						todo.todoid=todoid;
						todo.$abandon().then(function(result){
							$scope.updateTDTodos();
							console.log('abandoned');
						},
						function(result){
							console.log(result);
						});
					},
					function(result){
						//Cancel
					});
			};

			$scope.doneTodo=function(todoid){
				showMsgBox($modal,'Please confirm you want to set this item as done.',true,true,
					function(result){
						var todo=new TDTodoSvc();
						todo.todoid=todoid;
						todo.$done().then(function(result){
							$scope.updateTDTodos();
							console.log('done');
						},
						function(result){
							console.log(result);
						});
					},
					function(result){
						//Cancel
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


