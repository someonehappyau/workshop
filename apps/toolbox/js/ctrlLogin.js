'use strict';

function showLoginBox($modal,callback){
	var modalInstance=$modal.open({
		animation:true,
		templateUrl:'partials/login.html',
		controller:'mdlLoginBoxCtrl'
	});

	modalInstance.result.then(function(user){
			callback('logged in',user);
	},
	function(){
		callback('not logged in');
	});
};

toolboxControllers.controller('mdlLoginBoxCtrl',['$scope','$modalInstance','UserSvc','Session','AuthService','$cookies',
		function($scope,$modalInstance,UserSvc,Session,AuthService,$cookies){
			$scope.user={username:'',password:''};

			$scope.submitForm=function(){
				AuthService.login($scope.user.username,$scope.user.password,function(err,user){
					if(err){
						$cookies.put('pl','');
						$cookies.put('username','');
						$scope.alertMsg=err.statusText;
						$scope.alertStyle='alert-danger';
					}
					else{
						$modalInstance.close(user);
					}	
				});
			};
		}]);

