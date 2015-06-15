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

toolboxControllers.controller('mdlLoginBoxCtrl',['$scope','$modalInstance','UserSvc','Session','AuthService',
		function($scope,$modalInstance,UserSvc,Session,AuthService){
			$scope.user={username:'',password:''};

			$scope.submitForm=function(){
				var user=AuthService.login($scope.username,$scope.password);
				if (!!user){
					$modalInstance.close(user);
				}
				else{
					$scope.alertMsg=err.statusText;
					$scope.alertStyle='alert-danger';
				}
			};

		}]);

