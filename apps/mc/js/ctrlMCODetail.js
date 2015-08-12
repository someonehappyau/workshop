'use strict';

mcControllers.controller('MCODetailCtrl',['$scope','MCOriginSvc','$routeParams','MCModelSvc',
		function($scope,MCOriginSvc,$routeParams,MCModelSvc){
			$scope.loadMCO=function(id){
				MCOriginSvc.getOne({id:id}).$promise.then(function(mco){
					$scope.mco=mco;
				},
				function(err){
					console.log(err);
				});
			};

			$scope.loadMCO($routeParams.id);
			
			$scope.stateExisted={
				model:{type:'label-danger',msg:'Not Found'},
				engine:{type:'label-danger',msg:'Not Found'},
				frame:{type:'label-danger',msg:'Not Found'}
			};
			
			$scope.changeStateExisted=function(state,value){
				if (!value){
					state.type='label-danger';
					state.msg='Not Found';
				}
				else{
					state.type='label-success';
					state.msg='Found';
				}
			};

			$scope.loadMCModel=function(id){
				MCModelSvc.getOne({id:id}).$promise.then(function(model){
					$scope.changeStateExisted($scope.stateExisted.model,true);	
				},
				function(err){
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.model,false);
				});
			};



		}]);

