'use strict';

mcControllers.controller('MCOriginCtrl',['$scope','MCOriginSvc','$location',
		function($scope,MCOriginSvc,$location){
		
		$scope.updateMCOs=function(){
			var shouldShow={
				page:$scope.currentPage
			};
			MCOriginSvc.list(shouldShow).$promise.then(function(mcos){
				console.log(mcos);
				$scope.totalItems=mcos.totalCount;
				$scope.mcos=mcos.data;
			},
			function(err){
				console.log(err);
				$scope.mcos=[];
			});
		};
		$scope.updateMCOs();

		$scope.updateCount=function(){
			var shouldShow={
				page:$scope.currentPage
			};
			MCOriginSvc.getCount(shouldShow).$promise.then(function(count){
				$scope.totalItems=count.count;
			},
			function(err){
				console.log(err);
				$scope.totalItems=-1;
			});
		};

		$scope.pageChanged=function(){
			$scope.query='';
			$scope.updateMCOs();
			return;
		};

		$scope.gotoDetail=function(id){
			$location.path('/mcoDetail/'+id);
		};

		}]);
