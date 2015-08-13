'use strict';

mcControllers.controller('MCODetailCtrl',['$scope','MCOriginSvc','$routeParams','MCModelSvc','TDTypeSvc','$parse',
		function($scope,MCOriginSvc,$routeParams,MCModelSvc,TDTypeSvc,$parse){
			$scope.model={
				id:'',
				maker:'',
				label:'',
				yearStart:'',
				yearEnd:'',
				type:''
			};

			$scope.loadMCO=function(id){
				MCOriginSvc.getOne({id:id}).$promise.then(function(mco){
					$scope.mco=mco;
					$scope.model.id=mco.mcFinal;
					$scope.loadMCModel();
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

			$scope.loadMCModel=function(){
				//console.log($scope.model);
				var id;
				if (!$scope.model.id)
					id='0';
				else
					id=$scope.model.id;
				MCModelSvc.getOne({id:id}).$promise.then(function(model){
					$scope.changeStateExisted($scope.stateExisted.model,true);	
				},
				function(err){
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.model,false);
				});
			};

			$scope.submitModel=function(){
				MCModelSvc.update({model:$scope.model,mcoid:$scope.mco.id}).$promise.then(function(model){
					$scope.model=model;
					$scope.loadMCModel();
				},
				function(err){
					console.log(err);
				});
					
			};

			$scope.loadType=function(typename,objname){
				TDTypeSvc.list({typeName:typename}).$promise.then(function(types){
					if (!!types){
						var model=$parse(objname);
						model.assign($scope,types);
					}
				});
			};
			
			$scope.loadType('MCMaker','makers');
			$scope.loadType('MCModelType','modelTypes');


		}]);

