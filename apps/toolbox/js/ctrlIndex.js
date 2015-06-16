'use strict';

var toolboxControllers=angular.module('toolboxControllers',[]);

toolboxControllers.controller('IndexCtrl',['$scope','$modal','$rootScope','USER_ROLES','AuthService','Session',
		function($scope,$modal,$rootScope,USER_ROLES,AuthService,Session){
			$scope.currentUser=null;
			$scope.userRoles = USER_ROLES;
			$scope.isAuthorized = AuthService.isAuthorized;
			
	   		$scope.isLoggedin=function(){
				return AuthService.isAuthenticated();
			};

			$scope.getUsername=function(){
				return Session.user.username;
			};

			$scope.setCurrentUser=function(user){
				$scope.currentUser = user;
			};
	
			$scope.logout=function(){
				$scope.currentUser=null;
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

