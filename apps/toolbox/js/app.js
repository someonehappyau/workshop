'use strict';

var toolboxApp=angular.module('toolboxApp',[
	'ngRoute',
	'ngCookies',
	'ui.bootstrap',
	'toolboxControllers',
	'toolboxServices',
	'todolistControllers',
	'todolistServices'
]);



toolboxApp.constant('AUTH_EVENTS', {
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
	  all: '*',
	  admin: 'admin',
	  user: 'user',
	  guest: 'guest'
})
.run(['$cookies','AuthService','$q',function($cookies,AuthService){
	console.log(Date.now());
//   	if(AuthService.isLoggedIn()===false){
//		console.log('false');
//		AuthService.profile();
//	}
	AuthService.authenticate();
}]);

toolboxApp.service('Session', function () {
	this.create = function (sessionId, user) {
		this.id = sessionId;
		this.user = user;
	};
	    
	this.destroy = function () {
		this.id = null;
		this.user = null;
	};
});

toolboxApp.factory('AuthService', function (UserSvc, Session, $cookies,$q) {
	  var authService = {};
	   
	    authService.login = function (username,password,callback) {
			var svcUser=new UserSvc();
			svcUser.username=username;
			svcUser.password=password;
			svcUser.$login().then(function(res){
				Session.create(res.sessionid,res.user);
				callback(null,res.user);
			},
			function(err){
				callback(err,null);
			});

  		};
		
		authService.profile=function(){
			var deferred=$q.defer();
			var svcUser=new UserSvc();
			svcUser.$profile().then(function(res){
				Session.create(res.sessionid,res.user);
				console.log('relogin');
				deferred.resolve();
			},
			function(){
				deferred.reject('NOT_AUTHENTICATED');
			});
			return deferred.promise;
		};

		authService.authenticate=function(){
			var deferred=$q.defer();
			if (authService.isAuthenticated())
				deferred.resolve();
			else
				authService.profile().then(function(){
					deferred.resolve();
				},
				function(){
					deferred.reject();
				});
			return deferred.promise;
		};

		authService.isLoggedIn=function(){
			return !!Session.user;
		};

		authService.isAuthenticated = function () {

//			if (!!Session.user!==true){
//				authService.profile().then(function(){
//					return !!Session.user;
//				},
//				function(){
//					return !!Session.user;
//				});
//			}
//			else
				return !!Session.user;
		};
		   
		    authService.isAuthorized = function (authorizedRoles) {
				    if (!angular.isArray(authorizedRoles)) {
						      authorizedRoles = [authorizedRoles];
							      }
					    return (authService.isAuthenticated() &&
								      authorizedRoles.indexOf(Session.user.role) !== -1);
						  };
			 
			  return authService;
});



toolboxApp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/toolbox',{
					templateUrl:'partials/toolbox.html',
					controller:'ToolboxCtrl'
				}).
				when('/todolist',{
					templateUrl:'partials/todolist.html',
					controller:'TodolistCtrl',
					resolve:{
						validation: ['AuthService','$location',function(AuthService,$location){
											AuthService.authenticate().then(function(){
												console.log('hi');
											},
											function(){
												$location.path('/toolbox');
											});
									}]
					}
				}).
				when('/todolist/config/:typeName',{
					templateUrl:'partials/TDConfig.html',
					controller:'TDTypeCtrl',
					resolve:{
						validation: function($route,AuthService,$location){
							AuthService.authenticate().then(function(){
								console.log('authenticated');
								var typeName=$route.current.params.typeName; 
								if (typeName==='TDCategory'	|| 
									typeName==='TDStatus' || 
									typeName==='UserStatus' ||
									typeName==='UserRole'){
							    	}
								else{
									$location.path('/toolbox');
								}
							},
							function(){
								$location.path('/toolbox');
							});
						}
					}
								
				}).
				otherwise({
					redirectTo:'/toolbox'
				});
		}]);

