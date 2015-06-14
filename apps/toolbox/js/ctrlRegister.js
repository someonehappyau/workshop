'use strict';

function showRegisterBox($modal){
	var modalInstance=$modal.open({
		animation:true,
		templateUrl:'partials/register.html',
		controller:'mdlRegisterBoxCtrl'
	});

	modalInstance.result.then(function(msg){
			console.log('msg:'+msg);
	});
};

toolboxControllers.controller('mdlRegisterBoxCtrl',['$scope','$modalInstance','UserSvc',
		function($scope,$modalInstance,UserSvc){
			$scope.user={username:'',password:''};

			$scope.checkUsernameDuplication=function(){
				UserSvc.byusername({username:$scope.user.username}).$promise.then(function(user){
					$scope.msgDup='User already Existed!';
					$scope.msgDupStyle='alert-danger';
				},
				function(err){
					$scope.msgDup='';
					$scope.msgDupStyle='';
				});
			};

			$scope.verifyPassword=function(){
				if ($scope.password_verification===$scope.user.password){
					$scope.pwdVer='';
					$scope.pwdVerStyle='';
				}
				else{
					$scope.pwdVer='Passwords inputed are not the same!';
					$scope.pwdVerStyle='alert-danger';
				}
			};

			$scope.submitForm=function(){
				var user=new UserSvc();
				user.user=$scope.user;
				user.$register().then(function(user){
					$modalInstance.close('registered');
				},
				function(err){
					console.log(err);
					$scope.alertMsg=err.statusText;
					$scope.alertStyle='alert-danger';
				});
			};

		}]);

