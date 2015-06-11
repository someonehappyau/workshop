'use strict';

var todolistControllers=angular.module('todolistControllers',[]);

todolistControllers.controller('TDTypeCtrl',['$scope', 'TDTypeSvc', '$modal','$rootScope','$routeParams','$location',
		function($scope,TDTypeSvc,$modal,$rootScope,$routeParams,$location){
			$scope.title=$routeParams.typeName+' Configuration';
			$scope.updateTDTypes=function(){
				TDTypeSvc.list({typeName:$routeParams.typeName}).$promise.then(function(types){
					$scope.types=types;
				},
				function(err){console.log(err);});
			}

			$scope.updateTDTypes();

			$scope.showTDTypeDetail=function(typeId){
				var modalInstance=$modal.open({
					animation:true,
					templateUrl:'partials/TDTypeDetail.html',
					controller:'mdlTDTypeDetailCtrl',
					resolve:{
						id:function(){
							   return typeId;
						   },
						typeName:function(){
							return $routeParams.typeName;
						}
					}
				});
			};

			$scope.addTDType=function(){
				var modalInstance=$modal.open({
 				   	animation:true,
					templateUrl:'partials/TDTypeEdit.html',
					controller:'mdlTDTypeAddCtrl',
					resolve:{
						typeName:function(){
							return $routeParams.typeName;
						}
					}
				});	
			};

			$scope.editTDType=function(typeId){
				var modalInstance=$modal.open({
 				   	animation:true,
					templateUrl:'partials/TDTypeEdit.html',
					controller:'mdlTDTypeEditCtrl',
				    	resolve: {
						id: function(){
							return typeId;
						},
						typeName:function(){
							return $routeParams.typeName;
						}
					}
				});	
			};


			$scope.deleteTDType=function(typeId){
				showMsgBox($modal,'Please confirm you want to delete this item.',true,true,
					function(result){
						var type=new TDTypeSvc();
						type.$delete({id:typeId,typeName:$routeParams.typeName}).then(function(result){
							$scope.updateTDTypes();
							console.log(result);
						},
						function(result){
							console.log(result);
						});
					},
					function(result){
						//Cancelled, doing nothing.
					});
			};
			
			var myListener=$scope.$on('TDTypeUpdate',function(event){
				$scope.updateTDTypes();
			});

			$scope.$on('destroy',myListener);

			var routeListener=$scope.$on('$routeChangeError',function(event, current, previous, rejection){
				if (rejection==='VALIDATION FAILED'){
					$location.path('/todolist');
				}
			});
		}]);


todolistControllers.controller('mdlTDTypeDetailCtrl',['$scope','TDTypeSvc','$modalInstance','id','typeName',function($scope,TDTypeSvc,$modalInstance,id,typeName){
	$scope.title=typeName+' Detail';
	TDTypeSvc.get({id:id,typeName:typeName}).$promise.then(function(type){
		$scope.type=type;
	},
	function(err){
		console.log(err);
	});
}]);


todolistControllers.controller('mdlTDTypeAddCtrl',['$scope','TDTypeSvc','$modalInstance','$timeout','$rootScope','typeName',
		function($scope, TDTypeSvc, $modalInstance,$timeout,$rootScope,typeName){
			$scope.title='Add '+typeName;
			$scope.alertMsg='';
			$scope.alertStyle='';
			$scope.btnName='ADD';
			$scope.nameIsDisabled=false;
			$scope.type={
				name:'',
				description:''
			};

			$scope.submitForm=function(){
				var type=new TDTypeSvc();
				type.type=$scope.type;
				type.$add({typeName:typeName}).then(function(data){
					$rootScope.$broadcast('TDTypeUpdate');
					$scope.alertMsg='Add '+typeName+' successfully!';
					$scope.alertStyle='alert-success';
					$scope.type={name:'',description:''};
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
				type.$byname({typeName:typeName,name:$scope.type.name}).then(function(data){
					$scope.msgDup='Already Existed!';
					$scope.msgDupStyle='alert-danger';
				},
				function(){
					$scope.msgDup='';
					$scope.msgDupStyle='';
				});
			};
}]);


todolistControllers.controller('mdlTDTypeEditCtrl',['$scope','TDTypeSvc','$modalInstance','$timeout','$rootScope','id','typeName',
		function($scope, TDTypeSvc, $modalInstance,$timeout,$rootScope,id,typeName){
			$scope.title='Edit '+typeName;
			$scope.alertMsg='';
			$scope.alertStyle='';
			$scope.btnName='EDIT';
			$scope.nameIsDisabled=true;
			$scope.type={name:'',description:''};
			var type=new TDTypeSvc();
			type.$get({id:id,typeName:typeName}).then(function(type){
				$scope.type=type;
			},
			function(err){
				$scope.alertMsg=err.statusText;
				$scope.alertStyle='alert-danger';
			});

			$scope.submitForm=function(){
				var type=new TDTypeSvc();
				type.type=$scope.type;
				type.$update({typeName:typeName}).then(function(data){
					$rootScope.$broadcast('TDTypeUpdate');
					$scope.alertMsg='Update '+typeName+' successfully!';
					$scope.alertStyle='alert-success';
					$scope.type={name:'',description:''};
					$timeout(function(){
						$modalInstance.close();
					},1000);
				},function(err){
					console.log(err);
					$scope.alertMsg=err.statusText;
					$scope.alertStyle='alert-danger';
				});
			};
}]);

