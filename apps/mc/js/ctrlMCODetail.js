'use strict';

mcControllers.controller('MCODetailCtrl',['$scope','MCOriginSvc','$routeParams','MCModelSvc','TDTypeSvc','$parse','toaster','MCEngineSvc','MCPicSvc',
		function($scope,MCOriginSvc,$routeParams,MCModelSvc,TDTypeSvc,$parse,toaster,MCEngineSvc,MCPicSvc){
			$scope.addAlert=function(type,msg){
				toaster.pop(type,null,msg);
			};

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

			$scope.orgPics=[];
			$scope.loadPictures=function(){
				console.log('load picture');
				MCOriginSvc.imageFromPage({urlMaker:$scope.mco.urlMaker,urlModel:$scope.mco.urlModel}).$promise.then(function(data){
					console.log(data.err);
					console.log(data.res);
					$scope.orgPics=data.result;
					for (var i=0;i<data.result.length;i++){
						$scope.orgPicsSel[i]=false;
					}
				},
				function(err){
					console.log(err);
				});
			};
			
			$scope.orgPicsSel=[];
			$scope.savePics=function(){
				var urls=[];
				for (var i=0;i<$scope.orgPics.length;i++){
					if($scope.orgPicsSel[i]==true){
						urls.push($scope.orgPics[i]);
					}
				}
				console.log(urls);
				MCPicSvc.addOne({mcid:$scope.model.id,urls:urls}).$promise.then(function(data){
					console.log(data);
				},
				function(err){
					console.log(err);
				});
			};

			$scope.stateExisted={
				model:{type:'label-danger',msg:'Not Found'},
				engine:{type:'label-danger',msg:'Not Found'},
				frame:{type:'label-danger',msg:'Not Found'},
				suspension:{type:'label-danger',msg:'Not Found'},
				brake:{type:'label-danger',msg:'Not Found'},
				wheel:{type:'label-danger',msg:'Not Found'},
				dimension:{type:'label-danger',msg:'Not Found'},
				drive:{type:'label-danger',msg:'Not Found'}
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

					$scope.loadMCEngine();
				},
				function(err){
					$scope.resetAll();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.model,false);
					$scope.updateLinkState();
					$scope.addAlert('error',err);
				});
			};

			$scope.loadMCEngine=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCEngineSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(engine){
					$scope.engine=engine;
					$scope.changeStateExisted($scope.stateExisted.engine,true);
					$scope.addAlert('success','Load Engine successfully.');
				},
				function(err){
					$scope.resetEngine();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.engine,false);
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

			$scope.submitEngine=function(){
				if (!$scope.model.id)
					$scope.engine.model=0;
				else
					$scope.engine.model=$scope.model.id;

				MCEngineSvc.update({engine:$scope.engine}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.engine.id=data.insertId;
					$scope.addAlert('success','Update Engine successfully.');
					$scope.loadMCEngine();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.resetModel=function(){
				
				$scope.changeStateExisted($scope.stateExisted.model,false);
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

			$scope.resetEngine=function(){
				$scope.changeStateExisted($scope.stateExisted.engine,false);
				$scope.engine={
					id:'',
					model:0,
					engCylCount:'',
					engFormat:'',
					engMount:'',
					engType:'',
					engCylValveInlet:'',
					engCylValveExhaust:'',
					engCamType:'',
					engCapacity:'',
					engBore:'',
					engStroke:'',
					engCompressionRatio:'',
					engCooling:'',
					engLubrication:'',
					engInductionType:'',
					engInductionTBDiameter:'',
					engInductionDesc:'',
					engMaxPowerHP:'',
					engMaxPowerKW:'',
					engMaxPowerRPM:'',
					engMaxTorqueNM:'',
					engMaxTorqueFTLB:'',
					engMaxTorqueRPM:'',
					engClutchOperation:'',
					engClutchType:'',
					engClutchPlateCount:'',
					engIgnition:'',
					engStarting:''
				}
			};
			$scope.resetEngine();

			$scope.resetAll=function(){
				$scope.resetModel();
				$scope.resetEngine();
			};

			$scope.loadType=function(typename,objname){
				TDTypeSvc.list({typeName:typename}).$promise.then(function(types){
					if (!!types){
						var model=$parse(objname);
						model.assign($scope,types);
					}
				});
			};
		
			$scope.reloadTypes=function(){
				console.log('reloading...');	
				$scope.loadType('MCMaker','makers');
				$scope.loadType('MCModelType','modelTypes');

				$scope.loadType('MCEngFormat','engFormats');
				$scope.loadType('MCEngMount','engMounts');
				$scope.loadType('MCEngType','engTypes');
				$scope.loadType('MCEngCamType','engCamTypes');
				$scope.loadType('MCEngCooling','engCoolings');
				$scope.loadType('MCEngLubrication','engLubrications');
				$scope.loadType('MCEngInductionType','engInductionTypes');
				$scope.loadType('MCEngClutchOperation','engClutchOperations');
				$scope.loadType('MCEngClutchType','engClutchTypes');
				$scope.loadType('MCEngIgnition','engIgnitions');
				$scope.loadType('MCEngStarting','engStartings');
			};

			$scope.reloadTypes();

		}]);

