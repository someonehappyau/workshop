'use strict';

var toolboxControllers=angular.module('toolboxControllers',[]);

toolboxControllers.controller('IndexCtrl',['$scope','$modal','$rootScope','USER_ROLES','AuthService',
		function($scope,$modal,$rootScope,USER_ROLES,AuthService){
			$scope.currentUser=null;
			$scope.userRoles = USER_ROLES;
			$scope.isAuthorized = AuthService.isAuthorized;
				 
			$scope.setCurrentUser=function(user){
				$scope.currentUser = user;
			};

			
			$scope.register=function(){
				showRegisterBox($modal);
			};

			$scope.login=function(){
				showLoginBox($modal,function(msg,user){
					if(msg==='logged in'){
						$scope.setCurrentUser(user);
						console.log(user);
					}
				});
			};
		}]);

