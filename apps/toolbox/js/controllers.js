'use strict';

var toolboxControllers=angular.module('toolboxControllers',[]);

toolboxControllers.controller('TodolistCtrl',['$scope', 'TDCategorySvc', '$modal',
		function($scope,TDCategorySvc,$modal){
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
				var result=TDCategorySvc.delete({id:Id},function(){
					console.log(result);
				});
			};

			$scope.editIt=function(Id){

			};

			var categories=TDCategorySvc.list(function(){
				$scope.categories=categories;
			});
		}]);


toolboxControllers.controller('ModalInstanceCtrl',['$scope','TDCategorySvc','$modalInstance','Id',function($scope,TDCategorySvc,$modalInstance,Id){
	console.log(Id);
	var category=TDCategorySvc.get({id:Id},function(){
		$scope.category=category;
	});
}]);

toolboxControllers.controller('AddCategoryCtrl',['$scope','TDCategorySvc','$modalInstance','Id',function($scope, TDCategorySvc, $modalInstance, Id){
	$scope.title='Add Category';
	
