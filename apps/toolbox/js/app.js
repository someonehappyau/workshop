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
	  this.create = function (sessionId, userId, userRole) {
		      this.id = sessionId;
			      this.userId = userId;
				      this.userRole = userRole;
					    };
	    this.destroy = function () {
			    this.id = null;
				    this.userId = null;
					    this.userRole = null;
						  };
});

toolboxApp.factory('AuthService', function ($http, Session) {
	  var authService = {};
	   
	    authService.login = function (credentials) {
			    return $http
	      .post('/login', credentials)
	      .then(function (res) {
			          Session.create(res.data.id, res.data.user.id,
						                         res.data.user.role);
					          return res.data.user;
							        });
  };
		 
		  authService.isAuthenticated = function () {
			      return !!Session.userId;
				    };
		   
		    authService.isAuthorized = function (authorizedRoles) {
				    if (!angular.isArray(authorizedRoles)) {
						      authorizedRoles = [authorizedRoles];
							      }
					    return (authService.isAuthenticated() &&
								      authorizedRoles.indexOf(Session.userRole) !== -1);
						  };
			 
			  return authService;
});
