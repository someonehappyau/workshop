'use strict';

var toolboxApp=angular.module('toolboxApp',[
	'ngRoute',
	'ui.bootstrap',
	'toolboxControllers',
	'toolboxServices',
	'todolistControllers',
	'todolistServices'
]);

toolboxApp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/todolist',{
					templateUrl:'partials/todolist.html',
					controller:'TodolistCtrl'
				}).
				when('/todolist/config/:typeName',{
					templateUrl:'partials/TDConfig.html',
					controller:'TDTypeCtrl',
					resolve:{
						validation: function($q,$route){
							var deferred=$q.defer();
							var typeName=$route.current.params.typeName;
							if (typeName==='TDCategory' || 
							    typeName==='TDStatus' ||
								typeName==='UserStatus' ||
								typeName==='UserRole'){
								deferred.resolve();
							    }
							else{
								deferred.reject('VALIDATION FAILED');
							}
							return deferred.promise;
						}
					}
								
				}).
				otherwise({
					redirectTo:'/todolist'
				});
		}]);


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
});

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

toolboxApp.factory('AuthService', function (UserSvc, Session) {
	  var authService = {};
	   
	    authService.login = function (username,password) {
			var svcUser=new UserSvc();
			svcUser.username=username;
			svcUser.password=password;
			svcUser.$login().then(function(res){
				Session.create(res.sessionid,res.user);
				return res.user;
			},
			function(err){
				return err
			});

  		};
		 
		  authService.isAuthenticated = function () {
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
