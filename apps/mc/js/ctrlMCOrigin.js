'use strict';

mcControllers.controller('MCOriginCtrl',['$scope','MCOriginSvc','$location','$routeParams',
		function($scope,MCOriginSvc,$location,$routeParams){

		$scope.searchStr=$routeParams.searchStr;
		if ($scope.searchStr==='undefined')
			$scope.searchStr='';
		if (typeof($scope.searchStr)!=='undefined')
			$scope.searchStr=$scope.searchStr.trim();

		if ($routeParams.currentPage==='undefined' || !$routeParams.currentPage)
			$scope.currentPage=1;
		else
			$scope.currentPage=$routeParams.currentPage;

		$scope.doSearch=function(){
			$scope.updateMCOs();
		};
		
		var firstUpdate=true;

		
		$scope.updateMCOs=function(){
			console.log($scope.currentPage);
			if ($scope.currentPage==='undefined')
				$scope.currentPage=1;
			var shouldShow={
				page:$scope.currentPage,
				searchStr:$scope.searchStr
			};
			MCOriginSvc.list(shouldShow).$promise.then(function(mcos){
				console.log(mcos);
				$scope.totalItems=mcos.totalCount;
				$scope.mcos=mcos.data;
				if (firstUpdate===true){
					$scope.currentPage=$routeParams.currentPage;	
					firstUpdate=false;
				}

			},
			function(err){
				console.log(err);
				$scope.mcos=[];
			});
		};
		$scope.updateMCOs();

		$scope.updateCount=function(){
			console.log('update count-'+$scope.currentPage);
			var shouldShow={
				page:$scope.currentPage,
				searchStr:$scope.searchStr
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
			if (firstUpdate===true)
				return;
			console.log('page changed-'+$scope.currentPage);
			$scope.query='';
			$scope.updateMCOs();
			return;
		};

		//$scope.currentPage=$routeParams.currentPage;

		//console.log($scope.currentPage);

		$scope.gotoDetail=function(id){
			$location.path('/mcoDetail/'+id+'/'+$scope.searchStr+'/'+$scope.currentPage+'/');
		};

		}]);
