'use strict';

var mcApp=angular.module('mcApp',[
	'ngRoute',
	'ngCookies',
	'ui.bootstrap',
	'mcControllers',
	'mcServices',
	'ngSanitize',
	'ngAnimate',
	'toaster',
]);

var mcServices=angular.module('mcServices',['ngResource']);

mcApp.constant('AUTH_EVENTS', {
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
	AuthService.authenticate();
}]);

mcApp.service('Session', function () {
	this.create = function (sessionId, user) {
		this.id = sessionId;
		this.user = user;
	};
	    
	this.destroy = function () {
		this.id = null;
		this.user = null;
	};
});

mcApp.factory('AuthService', function (UserSvc, Session, $cookies,$q,$location) {
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
		
	authService.resetUser=function(){
		Session.destroy();
	};

	authService.profile=function(){
		var deferred=$q.defer();
		var svcUser=new UserSvc();
		svcUser.$profile().then(function(res){
			Session.create(res.sessionid,res.user);
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

	authService.isAdmin=function(){
		if (!!Session.user) 
			if (Session.user.role==='admin')
				return true;
			else
				return false;
		else
			return false;
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
	
   	authService.logout=function(){
		UserSvc.logout();
		authService.resetUser();
		$location.path('/');
	};

	return authService;
	});

	mcApp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/mc',{
					templateUrl:'partials/mc.html',
					controller:'MCCtrl'
				}).
				when('/mcolist',{
					templateUrl:'partials/mcolist.html',
					controller:'MCOriginCtrl',
					resolve:{
						validation: ['AuthService','$location',function(AuthService,$location){
											AuthService.authenticate().then(function(){
											},
											function(){
												$location.path('/mc');
											});
									}]
					}
				}).
				when('/mcoDetail/:id',{
					templateUrl:'partials/mcoDetail.html',
					controller:'MCODetailCtrl',
					resolve:{
						validation: ['AuthService','$location',function(AuthService,$location){
											AuthService.authenticate().then(function(){
											},
											function(){
												$location.path('/mc');
											});
									}]
					}
				}).
				when('/edittodo/:id',{
					templateUrl:'partials/todolist_add.html',
					controller:'TodolistAddCtrl',
					resolve:{
						validation: ['AuthService','$location',function(AuthService,$location){
											AuthService.authenticate().then(function(){
											},
											function(){
												$location.path('/toolbox');
											});
									}],
						isEdit: function(){
									return true;
								}
					}
				}).
				when('/mc/config/:typeName',{
					templateUrl:'partials/TDConfig.html',
					controller:'TDTypeCtrl',
					resolve:{
						validation: function($route,AuthService,$location){
							AuthService.authenticate().then(function(){
								console.log('authenticated');
								var typeName=$route.current.params.typeName; 
								if (typeName==='MCOrgState' || 
									typeName==='MCMaker' ||
									typeName==='MCModelType' ||
									typeName==='MCEngFormat' ||	
									typeName==='MCEngMount' ||	
									typeName==='MCEngType' ||	
									typeName==='MCEngCamType' ||	
									typeName==='MCEngCooling' ||	
									typeName==='MCEngLubrication' ||	
									typeName==='MCEngInductionType' ||	
									typeName==='MCEngClutchOperation' ||	
									typeName==='MCEngClutchType' ||	
									typeName==='MCEngIgnition' ||	
									typeName==='MCEngStarting'	
								){
							    	}
								else{
									$location.path('/mc');
								}
							},
							function(){
								$location.path('/mc');
							});
						}
					}
								
				}).
				otherwise({
					redirectTo:'/mc'
				});
		}]);

