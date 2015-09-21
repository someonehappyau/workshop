'use strict';

mcControllers.controller('MCModelListCtrl',['$scope','MCModelSvc','$location','$routeParams',
		function($scope,MCModelSvc,$location,$routeParams){

		$scope.searchStr=$routeParams.searchStr;
		if ($scope.searchStr==='undefined')
			$scope.searchStr='';
		if (typeof($scope.searchStr)!=='undefined')
			$scope.searchStr=$scope.searchStr.trim();

		$scope.doSearch=function(){
			$scope.updateMCs();
		};
		
		var firstUpdate=true;

		$scope.currentPage=$routeParams.currentPage;

		$scope.updateMCs=function(){
			console.log($scope.currentPage);
			var shouldShow={
				page:$scope.currentPage,
				searchStr:$scope.searchStr
			};
			MCModelSvc.list(shouldShow).$promise.then(function(data){
				console.log(data);
				$scope.totalItems=data.totalCount;
				$scope.mcs=data.data;
				if (firstUpdate===true){
					$scope.currentPage=$routeParams.currentPage;	
					firstUpdate=false;
				}

			},
			function(err){
				console.log(err);
				$scope.mcs=[];
			});
		};
		$scope.updateMCs();

		$scope.updateCount=function(){
			console.log('update count-'+$scope.currentPage);
			var shouldShow={
				page:$scope.currentPage,
				searchStr:$scope.searchStr
			};
			MCModelSvc.getCount(shouldShow).$promise.then(function(count){
				$scope.totalItems=count.count;
			},
			function(err){
				console.log(err);
				$scope.totalItems=-1;
			});
		};

		$scope.pageChanged=function(){
			if (firstUpdate===true)
				return;
			console.log('page changed-'+$scope.currentPage);
			$scope.query='';
			$scope.updateMCs();
			return;
		};

		//$scope.currentPage=$routeParams.currentPage;

		//console.log($scope.currentPage);

		$scope.gotoDetail=function(id){
			$location.path('/mcDetail/'+id+'/'+$scope.searchStr+'/'+$scope.currentPage+'/');
		};

		}]);
