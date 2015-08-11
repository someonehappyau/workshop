'use strict';

mcControllers.controller('MCODetailCtrl',['$scope','MCOriginSvc','$routeParams',
		function($scope,MCOriginSvc,$routeParams){
			$scope.loadMCO=function(id){
				MCOriginSvc.getOne({id:id}).$promise.then(function(mco){
					$scope.mco=mco;
				},
				function(err){
					console.log(err);
				});
			};

			$scope.loadMCO($routeParams.id);
		}]);

mcApp.directive('mcoTable', function($log){
	return {
		restrict:'E',
		//template: '{{innerval}}',
		link:function(scope,el,attrs){
			el.html('abcde');
		}
	};
});
