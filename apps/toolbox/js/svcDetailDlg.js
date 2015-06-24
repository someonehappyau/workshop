'use strict';

toolboxServices.factory('DetailDlgSvc',
	['$modal',
	function($modal){
		var svc={};

		svc.showDetail=function(data){
			console.log(data);
			for (var o in data){
				if (typeof(data[o])!=='function')
					console.log(o+'='+data[o]+' is '+typeof data[o]);
			}

			var modalInstance=$modal.open({
				animation:true,
			    	templateUrl:'partials/DetailDlg.html',
			    	controller:'mdlDetailDlgCtrl',
			    	resolve:{
					data:function(){
						return data;
					}
				}
			});
		};

		return svc;
	}]);

toolboxControllers.controller('mdlDetailDlgCtrl',
	['$scope','$modalInstance','data',
	function($scope,$modalInstance,data){
		$scope.data=data;
	}]);

toolboxApp.directive('ngDetailList',function(){
	function link(scope,element,attrs){
		console.log(scope);
		element.bind('click',function(){
		console.log('aaa');
		element.html('aaa');
		});
	}

	return {
		link:link
	};
});
