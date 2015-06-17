'use strict';

var toolboxControllers=angular.module('toolboxControllers',[]);

toolboxControllers.controller('IndexCtrl',['$scope','$modal','$rootScope','USER_ROLES','AuthService','Session','AUTH_EVENTS','$location',
		function($scope,$modal,$rootScope,USER_ROLES,AuthService,Session,AUTH_EVENTS,$location){
			$scope.currentUser=null;
			$scope.userRoles = USER_ROLES;
			$scope.isAuthorized = AuthService.isAuthorized;
			
	   		$scope.isLoggedin=function(){
				return AuthService.isAuthenticated();
			};

			$scope.isAdmin=function(){
				return AuthService.isAdmin();
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

			$rootScope.$on(AUTH_EVENTS.sessionTimeout,function(event){
				console.log(event);
				AuthService.resetUser();
				$location.path('/toolbox');
			});
		}]);

