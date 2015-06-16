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
.run(['$cookies','AuthService',function($cookies,AuthService){
	console.log(Object.keys($cookies.getAll()).indexOf('pl'));
	if (Object.keys($cookies.getAll()).indexOf('pl')!==-1 && Object.keys($cookies.getAll()).indexOf('username')!==-1)
   		if($cookies.get('pl')!=='' && $cookies.get('username')!=='' && AuthService.isAuthenticated()===false){
			console.log('profile');
			console.log(AuthService.isAuthenticated());
			AuthService.profile();
		}
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

toolboxApp.factory('AuthService', function (UserSvc, Session, $cookies) {
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
			var svcUser=new UserSvc();
			svcUser.pl=$cookies.get('pl');
			svcUser.username=$cookies.get('username');
			svcUser.$profile().then(function(res){
				Session.create(res.sessionid,res.user);
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
						validation: ['$q','AuthService','$location',function($q,AuthService,$location){
										var deferred=$q.defer();
										if (AuthService.isAuthenticated()){
											console.log('hi');
											deferred.resolve();
										}
										else{
											$location.path('/toolbox');
											deferred.reject('NOT_AUTHENTICATED');
										}
										return deferred.promise;
									}]
					}
				}).
				when('/todolist/config/:typeName',{
					templateUrl:'partials/TDConfig.html',
					controller:'TDTypeCtrl',
					resolve:{
						validation: function($q,$route,AuthService,$location){
							var deferred=$q.defer();
							if (AuthService.isAuthenticated()){
								var typeName=$route.current.params.typeName; 
								if (typeName==='TDCategory'	|| 
									typeName==='TDStatus' || 
									typeName==='UserStatus' ||
									typeName==='UserRole'){
										deferred.resolve();
							    	}
								else{
									$location.path('toolbox');
									deferred.reject('VALIDATION FAILED');
								}
							}
							else{
								$location.path('/toolbox');
								deferred.reject('NOT_AUTHENTICATED');
							}
							return deferred.promise;
						}
					}
								
				}).
				otherwise({
					redirectTo:'/todolist'
				});
		}]);

