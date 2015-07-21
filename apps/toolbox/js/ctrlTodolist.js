'use strict';

toolboxControllers.controller('TodolistCtrl',['$scope','TDTodoSvc', '$modal','$rootScope','$location','DetailDlgSvc','$filter',
		function($scope,TDTodoSvc,$modal,$rootScope,$location,DetailDlgSvc,$filter){
			$scope.shouldShowNormal=true;
			$scope.shouldShowDone=false;
			$scope.shouldShowAbandon=false;

			$scope.updateTDTodos=function(){
				console.log($scope.currentPage);
				var shouldShow={
					page:$scope.currentPage,
					normal:$scope.shouldShowNormal,
					abandon:$scope.shouldShowAbandon,
					done:$scope.shouldShowDone,
				};
				TDTodoSvc.list(shouldShow).$promise.then(function(todos){
					console.log(todos);
					$scope.totalItems=todos.totalCount;
					$scope.todos=todos.data;
					//$scope.updateCount();
					//$scope.currentPage=1;
				},
				function(err){
					console.log(err);
					$scope.todos=[];
				});
			};

			$scope.updateTDTodos();
		
			$scope.updateCount=function(){
				var shouldShow={
					page:$scope.currentPage,
					normal:$scope.shouldShowNormal,
					abandon:$scope.shouldShowAbandon,
					done:$scope.shouldShowDone,
				};
				TDTodoSvc.getCount(shouldShow).$promise.then(function(count){
					$scope.totalItems=count.count;
				},
				function(err){
					console.log(err);
					$scope.totalItems=-1;
				});
			};
			//$scope.updateCount();

			$scope.pageChanged=function(){
				$scope.query='';
				$scope.updateTDTodos();
				return;
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
						'Category':todo.categoryLabel,
						'Due Date':todo.dateDue,
						'Priority':todo.priorityLabel,
						'Last Modified At':$filter('date')(todo.dateUpdated,'yyyy-MM-dd HH:mm:ss','+1000'),
						'Creation Date':$filter('date')(todo.dateCreation,'yyyy-MM-dd HH:mm:ss','+1000'),
						'Created By':todo.creatorUsername,
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


