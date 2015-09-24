'use strict';

mcControllers.controller('MCODetailCtrl',['$scope','MCOriginSvc','$routeParams','MCModelSvc','TDTypeSvc','$parse','toaster','MCEngineSvc','MCFrameSvc','MCSuspensionSvc','MCBrakeSvc','MCWheelSvc','MCDimensionSvc','MCDriveSvc','MCPicSvc','FileUploader','$timeout',
		function($scope,MCOriginSvc,$routeParams,MCModelSvc,TDTypeSvc,$parse,toaster,MCEngineSvc,MCFrameSvc,MCSuspensionSvc,MCBrakeSvc,MCWheelSvc,MCDimensionSvc,MCDriveSvc,MCPicSvc,FileUploader,$timeout){
			if (!$routeParams.searchStr)
				$scope.searchStr=' ';
			else
				$scope.searchStr=$routeParams.searchStr;

			if (!$routeParams.currentPage)
				$scope.currentPage=1;
			else
				$scope.currentPage=$routeParams.currentPage;

			$scope.addAlert=function(type,msg){
				toaster.pop(type,null,msg);
			};

			$scope.linkStateType='warning';
			$scope.linkStateMsg='N/A';

			$scope.loadMCO=function(id){
				MCOriginSvc.getOne({id:id}).$promise.then(function(mco){
					$scope.mco=mco;
					if (!!$scope.mco.urlModel){
						$scope.mco.urlModel='http://www.motorcyclespecs.co.za'+$scope.mco.urlModel.slice(2);
					}
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
				MCPicSvc.addPics({mcid:$scope.model.id,urls:urls}).$promise.then(function(data){
					console.log(data);
					if (data.fail>0)
						$scope.addAlert('warning','Save pics: '+data.success+' Success. '+data.fail+' Failed.');
					else
						$scope.addAlert('success',data.success+' pic(s) has been saved successfully.');
				},
				function(err){
					$scope.addAlert('error',err);
					console.log(err);
				});
			};

			$scope.PicsSel=[];
			$scope.selectPics=function(imgid){
				if ($scope.PicsSel.indexOf(imgid)===-1){
					$scope.PicsSel.push(imgid);
				}
				else{
					$scope.PicsSel.splice($scope.PicsSel.indexOf(imgid),1);
				}
			};

			$scope.deletePics=function(){
				console.log($scope.PicsSel);
				MCPicSvc.deletePics({pics:$scope.PicsSel}).$promise.then(function(data){
					console.log('delete done');
					console.log(data);
					if (data.fail>0)
						$scope.addAlert('warning','Delete Pics: '+data.success+' Success. '+data.fail+' Failed.');
					else
						$scope.addAlert('success',data.success+' pic(s) has been deleted successfully.');
					$scope.loadMCGallery();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
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
				drive:{type:'label-danger',msg:'Not Found'},
				gallery:{type:'label-danger',msg:'Not Found'}
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
					//$scope.model=model;
					$scope.dataCopy($scope.model,model);
					$scope.changeStateExisted($scope.stateExisted.model,true);
					$scope.updateLinkState();
					$scope.addAlert('success','Load Model successfully.');

					$scope.loadMCEngine();
					$scope.loadMCFrame();
					$scope.loadMCSuspension();
					$scope.loadMCBrake();
					$scope.loadMCWheel();
					$scope.loadMCDimension();
					$scope.loadMCDrive();
					$scope.loadMCGallery();
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
					//$scope.engine=engine;
					$scope.dataCopy($scope.engine,engine);
					$scope.changeStateExisted($scope.stateExisted.engine,true);
					$scope.addAlert('success','Load Engine successfully.');
				},
				function(err){
					$scope.resetEngine();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.engine,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Engine: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCFrame=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCFrameSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(data){
					$scope.dataCopy($scope.frame,data);
					//$scope.frame=data;
					$scope.changeStateExisted($scope.stateExisted.frame,true);
					$scope.addAlert('success','Load Frame successfully.');
				},
				function(err){
					$scope.resetFrame();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.frame,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Frame: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCSuspension=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCSuspensionSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(data){
					$scope.dataCopy($scope.suspension,data);
					//$scope.suspension=data;
					$scope.changeStateExisted($scope.stateExisted.suspension,true);
					$scope.addAlert('success','Load Suspension successfully.');
				},
				function(err){
					$scope.resetSuspension();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.suspension,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Suspension: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCBrake=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCBrakeSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(data){
					$scope.dataCopy($scope.brake,data);
					//$scope.brake=data;
					$scope.changeStateExisted($scope.stateExisted.brake,true);
					$scope.addAlert('success','Load Brake successfully.');
				},
				function(err){
					$scope.resetBrake();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.brake,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Brake: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCWheel=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCWheelSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(data){
					$scope.dataCopy($scope.wheel,data);
					//$scope.wheel=data;
					$scope.changeStateExisted($scope.stateExisted.wheel,true);
					$scope.addAlert('success','Load Wheel successfully.');
				},
				function(err){
					$scope.resetWheel();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.wheel,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Wheel: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCDimension=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCDimensionSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(data){
					$scope.dataCopy($scope.dimension,data);
					//$scope.dimension=data;
					$scope.changeStateExisted($scope.stateExisted.dimension,true);
					$scope.addAlert('success','Load Dimension successfully.');
				},
				function(err){
					$scope.resetDimension();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.dimension,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Dimension: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCDrive=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;

				MCDriveSvc.getOne({id:modelId, byModel:'true'}).$promise.then(function(data){
					$scope.dataCopy($scope.drive,data);
					//$scope.drive=data;
					$scope.changeStateExisted($scope.stateExisted.drive,true);
					$scope.addAlert('success','Load Drive successfully.');
				},
				function(err){
					$scope.resetDrive();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.drive,false);
					if (err.data==='not found')
						$scope.addAlert('warning','Drive: Not Found.');
					else
						$scope.addAlert('error',err);
				});
			};

			$scope.loadMCGallery=function(){
				var modelId;
				if (!$scope.model.id)
					modelId=0;
				else
					modelId=$scope.model.id;
				$scope.resetGallery();
				$scope.PicsSel=[];
				MCModelSvc.getGallery({mcid:modelId}).$promise.then(function(imgs){
					console.log(imgs.length);
					console.log(imgs);
					if (imgs.length===0){
						$scope.mcGalleries=[];
						$scope.changeStateExisted($scope.stateExisted.gallery,false);
						$scope.addAlert('warning','No images found.');
					}
					else{
						$scope.mcGalleries=imgs;
						$scope.changeStateExisted($scope.stateExisted.gallery,true);
						$scope.addAlert('success','Load Gallery successfully.');
					}
				},
				function(err){
					$scope.resetGallery();
					console.log(err);
					$scope.changeStateExisted($scope.stateExisted.gallery,false);
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

			$scope.submitFrame=function(){
				if (!$scope.model.id)
					$scope.frame.model=0;
				else
					$scope.frame.model=$scope.model.id;

				MCFrameSvc.update({frame:$scope.frame}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.frame.id=data.insertId;
					$scope.addAlert('success','Update Frame successfully.');
					$scope.loadMCFrame();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.submitSuspension=function(){
				if (!$scope.model.id)
					$scope.suspension.model=0;
				else
					$scope.suspension.model=$scope.model.id;

				MCSuspensionSvc.update({suspension:$scope.suspension}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.suspension.id=data.insertId;
					$scope.addAlert('success','Update Suspension successfully.');
					$scope.loadMCSuspension();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.submitBrake=function(){
				if (!$scope.model.id)
					$scope.brake.model=0;
				else
					$scope.brake.model=$scope.model.id;

				MCBrakeSvc.update({brake:$scope.brake}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.brake.id=data.insertId;
					$scope.addAlert('success','Update Brake successfully.');
					$scope.loadMCBrake();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.submitWheel=function(){
				if (!$scope.model.id)
					$scope.wheel.model=0;
				else
					$scope.wheel.model=$scope.model.id;

				MCWheelSvc.update({wheel:$scope.wheel}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.wheel.id=data.insertId;
					$scope.addAlert('success','Update Wheel successfully.');
					$scope.loadMCWheel();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.submitDimension=function(){
				if (!$scope.model.id)
					$scope.dimension.model=0;
				else
					$scope.dimension.model=$scope.model.id;

				MCDimensionSvc.update({dimension:$scope.dimension}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.dimension.id=data.insertId;
					$scope.addAlert('success','Update Dimension successfully.');
					$scope.loadMCDimension();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.submitDrive=function(){
				if (!$scope.model.id)
					$scope.drive.model=0;
				else
					$scope.drive.model=$scope.model.id;

				MCDriveSvc.update({drive:$scope.drive}).$promise.then(function(data){
					if (!!data.insertId)
						$scope.drive.id=data.insertId;
					$scope.addAlert('success','Update Drive successfully.');
					$scope.loadMCDrive();
				},
				function(err){
					console.log(err);
					$scope.addAlert('error',err);
				});
			};

			$scope.updateMCGalleryPosition=function(){
				var positions=[];
				for (var i=0;i<$scope.mcGalleries.length;i++){
					positions[i]={id:$scope.mcGalleries[i].id,pos:i+1};
					//var img=$scope.mcGalleries[i];
					//console.log(i+'model:'+img.model+'; pic:'+img.pic+'; fileName:'+img.picFileName);
				}
				console.log(positions);
				MCPicSvc.updatePositions({positions:positions}).$promise.then(function(data){
					console.log(data);
					if (data.fail>0)
						$scope.addAlert('warning','Update Position: '+data.success+' Success. '+data.fail+' Failed.');
					else
						$scope.addAlert('success','Position of '+data.success+' pic(s) has been updated successfully.');
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
				};
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
					engStarting:'',
					engDesc:''
				};
			};
			$scope.resetEngine();

			$scope.resetFrame=function(){
				$scope.changeStateExisted($scope.stateExisted.frame,false);
				$scope.frame={
					id:'',
					model:0,
					frameMaterial:'',
					frameType:'',
					frameRake:'',
					frameTrail:'',
					frameDesc:''
				};
			};
			$scope.resetFrame();

			$scope.resetSuspension=function(){
				$scope.changeStateExisted($scope.stateExisted.suspension,false);
				$scope.suspension={
					id:'',
					model:0,
					suspFType:'',
					suspFBrand:'',
					suspFDiameter:'',
					suspFPreload:0,
					suspFRebound:0,
					suspFCompression:0,
					suspFTravel:'',
					suspFDesc:'',
					suspRType:'',
					suspRBrand:'',
					suspRDiameter:'',
					suspRPreload:0,
					suspRRebound:0,
					suspRCompression:0,
					suspRTravel:'',
					suspRDesc:''
				};
			};
			$scope.resetSuspension();

			$scope.resetBrake=function(){
				$scope.changeStateExisted($scope.stateExisted.brake,false);
				$scope.brake={
					id:'',
					model:0,
					brakeFType:'',
					brakeFDiscCount:'',
					brakeFDiscDiameter:'',
					brakeFDiscPistonCountPerCaliper:'',
					brakeFDesc:'',
					brakeRType:'',
					brakeRDiscCount:'',
					brakeRDiscDiameter:'',
					brakeRDiscPistonCountPerCaliper:'',
					brakeRDesc:''
				};
			};
			$scope.resetBrake();

			$scope.resetWheel=function(){
				$scope.changeStateExisted($scope.stateExisted.wheel,false);
				$scope.wheel={
					id:'',
					model:0,
					wheelFDiameter:'',
					wheelFRimWidth:'',
					wheelFRimType:'',
					wheelFTyreType:'',
					wheelFTyreWidth:'',
					wheelFTyreRatio:'',
					wheelFDesc:'',
					wheelRDiameter:'',
					wheelRRimWidth:'',
					wheelRRimType:'',
					wheelRTyreType:'',
					wheelRTyreWidth:'',
					wheelRTyreRatio:'',
					wheelRDesc:''
				};
			};
			$scope.resetWheel();

			$scope.resetDimension=function(){
				$scope.changeStateExisted($scope.stateExisted.dimension,false);
				$scope.dimension={
					id:'',
					model:0,
					dimLength:'',
					dimWidth:'',
					dimHeight:'',
					dimWheelBase:'',
					dimSeatHeight:'',
					dimSeatHeightAlt:'',
					dimSeatHeightDesc:'',
					dimDryWeight:'',
					dimWetWeight:'',
					dimGroundClearance:'',
					dimTankCapacity:'',
					dimTankCapacityRes:''
				};
			};
			$scope.resetDimension();

			$scope.resetDrive=function(){
				$scope.changeStateExisted($scope.stateExisted.drive,false);
				$scope.drive={
					id:'',
					model:0,
					drvTransmissionType:'',
					drvTransmissionGearCount:'',
					drvWheelDriveType:'',
					drvTransmissionGearRatio:'',
					drvPrimaryDriveRatio:'',
					drvFinalDriveRatio1:'',
					drvFinalDriveRatio2:'',
					drvIsSlip:0,
					drvHasReverseGear:0
				};
			};
			$scope.resetDrive();

			$scope.dataCopy=function(dataOld,dataNew){
				for (var key in dataOld){
					dataOld[key]=dataNew[key];
				}
			};

			$scope.sortableOptions={
			};

			$scope.resetGallery=function(){
				$scope.mcGalleries=[];
			};
			$scope.resetGallery();

			$scope.resetAll=function(){
				$scope.resetModel();
				$scope.resetEngine();
				$scope.resetFrame();
				$scope.resetSuspension();
				$scope.resetBrake();
				$scope.resetWheel();
				$scope.resetDimension();
				$scope.resetDrive();
				$scope.resetGallery();
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

				$scope.loadType('MCFrameMaterial','frameMaterials');
				$scope.loadType('MCFrameType','frameTypes');

				$scope.loadType('MCSuspTypeFront','suspTypeFronts');
				$scope.loadType('MCSuspTypeRear','suspTypeRears');
				$scope.loadType('MCSuspBrand','suspBrands');

				$scope.loadType('MCBrakeType','brakeTypes');

				$scope.loadType('MCWheelRimType','wheelRimTypes');
				$scope.loadType('MCWheelTyreType','wheelTyreTypes');

				$scope.loadType('MCDrvTransmissionType','drvTransmissionTypes');
				$scope.loadType('MCDrvWheelDriveType','drvWheelDriveTypes');
			};

			$scope.reloadTypes();

			var uploader = $scope.uploader = new FileUploader({
			    url: 'svcMC/mcpic/uploadPics' 
				//formData: [{mcid:$scope.model.id}]
			});

			// FILTERS

			uploader.filters.push({
			    name: 'imageFilter',
			    fn: function(item /*{File|FileLikeObject}*/, options) {
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			    }
			});

			// CALLBACKS

			uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
			    console.info('onWhenAddingFileFailed', item, filter, options);
			};
			uploader.onAfterAddingFile = function(fileItem) {
				fileItem.formData.push({mcid:$scope.model.id});
			    console.info('onAfterAddingFile', fileItem);
			};
			uploader.onAfterAddingAll = function(addedFileItems) {
			    console.info('onAfterAddingAll', addedFileItems);
			};
			uploader.onBeforeUploadItem = function(item) {
				//item.formData.push({mcid:$scope.model.id});
			    console.info('onBeforeUploadItem', item);
			};
			uploader.onProgressItem = function(fileItem, progress) {
			    console.info('onProgressItem', fileItem, progress);
			};
			uploader.onProgressAll = function(progress) {
			    console.info('onProgressAll', progress);
			};
			uploader.onSuccessItem = function(fileItem, response, status, headers) {
			    console.info('onSuccessItem', fileItem, response, status, headers);
			};
			uploader.onErrorItem = function(fileItem, response, status, headers) {
			    console.info('onErrorItem', fileItem, response, status, headers);
			};
			uploader.onCancelItem = function(fileItem, response, status, headers) {
			    console.info('onCancelItem', fileItem, response, status, headers);
			};
			uploader.onCompleteItem = function(fileItem, response, status, headers) {
			    console.info('onCompleteItem', fileItem, response, status, headers);
			};
			uploader.onCompleteAll = function() {
				$timeout(function(){
					$scope.loadMCGallery();
				},1000);
			    console.info('onCompleteAll');
			};

			console.info('uploader', uploader);
			
		}]);

