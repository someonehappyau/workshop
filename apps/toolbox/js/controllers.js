'use strict';

var toolboxControllers=angular.module('toolboxControllers',[]);

toolboxControllers.controller('TodolistCtrl',['$scope', 'TDCategorySvc', '$modal','$rootScope',
		function($scope,TDCategorySvc,$modal,$rootScope){
			$scope.showDetail=function(id){
				console.log('dbl click');
				var modalInstance=$modal.open({
					animation:true,
					templateUrl:'partials/categoryDetail.html',
					controller:'ModalInstanceCtrl',
					resolve:{
						Id:function(){
							   return id;
						   }
					}
				});
			};

			$scope.deleteIt=function(Id){
				var category=new TDCategorySvc();
				category.$delete({id:Id}).then(function(result){
					var categories=TDCategorySvc.list(function(){
						$scope.categories=categories;
					});
					console.log(result);
				},
				function(result){
					console.log(result);
				});
			};
			
			$scope.addOne=function(){
				var modalInstance=$modal.open({
 				   	animation:true,
					templateUrl:'partials/categoryEdit.html',
					controller:'AddCategoryCtrl'
				});	
			};

			$scope.editIt=function(id){
				var modalInstance=$modal.open({
 				   	animation:true,
					templateUrl:'partials/categoryEdit.html',
					controller:'EditCategoryCtrl',
				    	resolve: {
						id: function(){
							return id;
						}
					}
				});	
			};

			var categories=TDCategorySvc.list(function(){
				$scope.categories=categories;
			});

			var myListener=$scope.$on('todolistUpdated',function(event){
				var categories=TDCategorySvc.list(function(){
					$scope.categories=categories;
				});
			});

			$scope.$on('destroy',myListener);
		}]);


toolboxControllers.controller('ModalInstanceCtrl',['$scope','TDCategorySvc','$modalInstance','Id',function($scope,TDCategorySvc,$modalInstance,Id){
	console.log(Id);
	var category=TDCategorySvc.get({id:Id},function(){
		$scope.category=category;
	});
}]);

toolboxControllers.controller('AddCategoryCtrl',['$scope','TDCategorySvc','$modalInstance','$timeout','$rootScope',function($scope, TDCategorySvc, $modalInstance,$timeout,$rootScope){
	$scope.title='Add Category';
	$scope.alertMsg='';
	$scope.alertStyle='';
	$scope.btnName='ADD';
	$scope.nameIsDisabled=false;
	$scope.category={
		name:'',
		description:''
	};
	$scope.submitForm=function(){
		var category=new TDCategorySvc();
		category.category=$scope.category;
		category.$add().then(function(data){
			$rootScope.$broadcast('todolistUpdated');
			$scope.alertMsg='Add new successfully!';
			$scope.alertStyle='alert-success';
			$scope.category={name:'',description:''};
			$timeout(function(){
				$scope.alertMsg='';
				$scope.alertStyle='';
			},1500);
		},function(err){
			console.log(err);
			$scope.alertMsg=err.statusText;
			$scope.alertStyle='alert-danger';
		});
	};

	$scope.checkDuplication=function(){
		var category=new TDCategorySvc();
		category.$byname({name:$scope.category.name}).then(function(data){
			$scope.msgDup='Already Existed!';
			$scope.msgDupStyle='alert-danger';
		},
		function(){
			$scope.msgDup='';
			$scope.msgDupStyle='';
		});
	};
}]);


toolboxControllers.controller('EditCategoryCtrl',['$scope','TDCategorySvc','$modalInstance','$timeout','$rootScope','id',function($scope, TDCategorySvc, $modalInstance,$timeout,$rootScope,id){
	$scope.title='Edit Category';
	$scope.alertMsg='';
	$scope.alertStyle='';
	$scope.btnName='EDIT';
	$scope.nameIsDisabled=true;
	$scope.category={name:'',description:''};
	var category=new TDCategorySvc();
	category.$get({id:id}).then(function(category){
		$scope.category=category;
	},
	function(err){
		$scope.alertMsg=err.statusText;
		$scope.alertStyle='alert-danger';
	});
	$scope.submitForm=function(){
		var category=new TDCategorySvc();
		category.category=$scope.category;
		category.$update().then(function(data){
			$rootScope.$broadcast('todolistUpdated');
			$scope.alertMsg='Update successfully!';
			$scope.alertStyle='alert-success';
			$scope.category={name:'',description:''};
			$timeout(function(){
				//$scope.alertMsg='';
				//$scope.alertStyle='';
				$modalInstance.close();
			},1000);
		},function(err){
			console.log(err);
			$scope.alertMsg=err.statusText;
			$scope.alertStyle='alert-danger';
		});
	};
}]);

