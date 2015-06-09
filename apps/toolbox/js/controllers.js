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
			
			$scope.addOne=function(){
				var modalInstance=$modal.open({
 				   	animation:true,
					templateUrl:'partials/categoryEdit.html',
					controller:'AddCategoryCtrl'
				});	
			};

			$scope.editIt=function(id){

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

toolboxControllers.controller('AddCategoryCtrl',['$scope','TDCategorySvc','$modalInstance',function($scope, TDCategorySvc, $modalInstance){
	$scope.title='Add Category';
	$scope.btnName='ADD';
	$scope.category={
		name:'',
		description:''
	};
	$scope.submitForm=function(){
		var category=new TDCategorySvc();
		//category.category=$scope.category;
		//category.data='aaa';
		category.$add(function(){
			console.log(category);
		});
	};
}]);
