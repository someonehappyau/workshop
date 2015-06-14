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

toolboxControllers.controller('mdlLoginBoxCtrl',['$scope','$modalInstance','UserSvc',
		function($scope,$modalInstance,UserSvc){
			$scope.user={username:'',password:''};

			$scope.submitForm=function(){
				var user=new UserSvc();
				user.username=$scope.user.username;
				user.password=$scope.user.password;
				user.$login().then(function(user){
					$modalInstance.close(user);
				},
				function(err){
					console.log(err);
					$scope.alertMsg=err.statusText;
					$scope.alertStyle='alert-danger';
				});
			};

		}]);

