'use strict';

mcControllers.controller('MCODetailCtrl',['$scope','MCOriginSvc','$routeParams','MCModelSvc','TDTypeSvc','$parse','toaster',
		function($scope,MCOriginSvc,$routeParams,MCModelSvc,TDTypeSvc,$parse,toaster){
			$scope.addAlert=function(type,msg){
				toaster.pop(type,null,msg);
			};

			$scope.resetModel=function(){
				$scope.model={
					id:'',
					maker:'',
					label:'',
					yearStart:'',
					yearEnd:'',
					type:''
				}
			};
			$scope.resetModel();

			$scope.linkStateType='warning';
			$scope.linkStateMsg='N/A';

			$scope.loadMCO=function(id){
				MCOriginSvc.getOne({id:id}).$promise.then(function(mco){
					$scope.mco=mco;
					if (!mco.mcFinal){

					}
					else{
						$scope.model.id=mco.mcFinal;
						$scope.loadMCModel();
					}
					$scope.updateLinkState();
					$scope.addAlert('success','Load MC Origin successfully.');
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
					$scope.updateLinkState();
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

			$scope.updateLink=function(){
				if (!!$scope.model.id){
					MCOriginSvc.update({mcoid:$scope.mco.id,mcFinal:$scope.model.id}).$promise.then(function(mco){
						$scope.mco.mcFinal=$scope.model.id;
						//console.log(mco);
						$scope.updateLinkState();
						$scope.addAlert('success','Update Link successfully.');
					},
					function(err){
						$scope.updateLinkState();
						$scope.addAlert('error',err);
					});
				}
			};

			$scope.updateLinkState=function(){
				if ($scope.mco.mcFinal===$scope.model.id){
						$scope.linkStateType='success';
						$scope.linkStateMsg='Linked to model id:'+$scope.mco.mcFinal;
				}
				else{
						$scope.linkStateType='danger';
						$scope.linkStateMsg='Not linked to model id:'+$scope.model.id;
				}
			};

			$scope.loadMCModel=function(){
				var id;
				if (!$scope.model.id)
					id='0';
				else
					id=$scope.model.id;
				MCModelSvc.getOne({id:id}).$promise.then(function(model){
					$scope.model=model;
					$scope.changeStateExisted($scope.stateExisted.model,true);
					$scope.updateLinkState();
					$scope.addAlert('success','Load Model successfully.');
				},
				function(err){
					$scope.resetModel();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.model,false);
					$scope.updateLinkState();
					$scope.addAlert('error',err);
				});
			};

			$scope.submitModel=function(){
				MCModelSvc.update({model:$scope.model,mcoid:$scope.mco.id}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.model.id=data.insertId;
					$scope.addAlert('success','Update Model successfully.');
					$scope.loadMCModel();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
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

