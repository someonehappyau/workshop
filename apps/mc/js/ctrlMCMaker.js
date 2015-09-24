'use strict';

mcControllers.controller('MCMakerCtrl',['$scope','MCMakerSvc','$modal','$rootScope','$location',
		function($scope,MCMakerSvc,$modal,$rootScope,$location){
			$scope.updateMCMakers=function(){
				MCMakerSvc.list().$promise.then(function(data){
					console.log(data);
					$scope.mcmakers=data;
				},
				function(err){
					console.log(err);
				});
			}
			$scope.updateMCMakers();

			$scope.addMCMaker=function(){
				var modalInstance=$modal.open({
					animation:true,
				    	templateUrl:'partials/mcMakerEdit.html',
				    	controller:'mdlMCMakerAddCtrl'
				});
			};

			$scope.editMCMaker=function(id){
				var modalInstance=$modal.open({
					animation:true,
				    	templateUrl:'partials/mcMakerEdit.html',
				    	controller:'mdlMCMakerEditCtrl',
				    	resolve:{
						id: function(){
							return id;
						}
					}
				});
			};
			
			var myListener=$scope.$on('MCMakerUpdate',function(event){
				$scope.updateMCMakers();
			});

			$scope.$on('destroy',myListener);

			var routeListener=$scope.$on('$routeChangeError',function(event,current,previous,rejection){
				if (rejection==='VALIDATION FAILED'){
					$location.path('/mc');
				}
			});

		}]);

mcControllers.controller('mdlMCMakerAddCtrl',
		['$scope','MCMakerSvc','$modalInstance','$timeout','$rootScope','TDTypeSvc','$parse',
		function($scope,MCMakerSvc,$modalInstance,$timeout,$rootScope,TDTypeSvc,$parse){
			$scope.title='Add';
			$scope.alertMsg='';
			$scope.alertStyle='';
			$scope.btnName='Add';
			$scope.nameIsDisabled=false;
			$scope.maker={
				label:'',
				description:'',
				country:'',
				imageBrand:'',
				state:'',
			};

			$scope.submitForm=function(){
				MCMakerSvc.add({mcmaker:$scope.maker}).$promise.then(function(data){
					$rootScope.$broadcast('MCMakerUpdate');
					$scope.alertMsg='Add successfully!';
					$scope.alertStyle='alert-success';
					$scope.maker={
						label:'',
						description:'',
						country:'',
						imageBrand:'',
						state:'',
					};
					$timeout(function(){
						$scope.alertMsg='';
						$scope.alertStyle='';
					},1500);
				},function(err){
					console.log(err);
					$scope.alertMsg=err.statusText;
					$scope.alertStyle='alert-danger';
				});
			};

			$scope.checkDuplication=function(){
				var type=new TDTypeSvc();
				MCMakerSvc.byname({label:$scope.maker.label}).$promise.then(function(data){
					$scope.msgDup='Already Existed!';
					$scope.msgDupStyle='alert-danger';
				},
				function(){
					$scope.msgDup='';
					$scope.msgDupStyle='';
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
		
			$scope.reloadTypes=function(){
				console.log('reloading...');	
				$scope.loadType('MCMakerCountry','countries');
				$scope.loadType('MCMakerState','states');
			};
			$scope.reloadTypes();

		}]);


mcControllers.controller('mdlMCMakerEditCtrl',
		['$scope','MCMakerSvc','$modalInstance','$timeout','$rootScope','id','TDTypeSvc','$parse',
		function($scope,MCMakerSvc,$modalInstance,$timeout,$rootScope,id,TDTypeSvc,$parse){
			$scope.title='Edit';
			$scope.alertMsg='';
			$scope.alertStyle='';
			$scope.btnName='EDIT';
			$scope.nameIsDisabled=true;
			$scope.maker={
				id:id,
				label:'',
				description:'',
				country:'',
				imageBrand:'',
				state:'',
			};
			MCMakerSvc.get({id:id}).$promise.then(function(maker){
				$scope.maker=maker;
			},
			function(err){
				$scope.alertMsg=err.statusText;
				$scope.alertStyle='alert-danger';
			});

			$scope.submitForm=function(){
				MCMakerSvc.update({mcmaker:$scope.maker}).$promise.then(function(data){
					$rootScope.$broadcast('MCMakerUpdate');
					$scope.alertMsg='Update successfully!';
					$scope.alertStyle='alert-success';
					$scope.maker={
						id:id,
						label:'',
						description:'',
						country:'',
						imageBrand:'',
						state:'',
					};
					$timeout(function(){
						$modalInstance.close();
					},1000);
				},function(err){
					console.log(err);
					$scope.alertMsg=err.statusText;
					$scope.alertStyle='alert-danger';
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
		
			$scope.reloadTypes=function(){
				console.log('reloading...');	
				$scope.loadType('MCMakerCountry','countries');
				$scope.loadType('MCMakerState','states');
			};
			$scope.reloadTypes();

		}]);
			
