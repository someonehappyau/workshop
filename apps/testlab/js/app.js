'use strict';

var testlabApp=angular.module('testlabApp',[
		'testlabControllers',
		'testlabServices',
		'testlabProviders',
		'testlabFactories'
		]);

var testlabControllers=angular.module('testlabControllers',[]);


testlabControllers.controller('ctrl1',
		['$scope','svc1','fty1',
		function($scope,svc1,fty1){
			
			$scope.val1=svc1.bang();
			$scope.val2=fty1.allF('and');
		}]);

var testlabServices=angular.module('testlabServices',[]);

testlabServices.service('svc1',function(){
	this.bang=function(){
		return 'BANG';
	}
});


var testlabFactories=angular.module('testlabFactories',[]);

testlabFactories.factory('fty1',function(){
	var f={
		item1:'apple',
		item2:'orange',
		allF:function(con){
			return this.item1+con+this.item2;
		}
	};

	return f;
});

var testlabProviders=angular.module('testlabProviders',[]);
