'use strict';

toolboxServices.factory('DetailDlgSvc',
	['$modal',
	function($modal){
		var svc={};

		svc.showDetail=function(title,data){
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
					title:function(){
						return title;
					},
					data:function(){
						return data;
					}
				}
			});
		};

		return svc;
	}]);

toolboxControllers.controller('mdlDetailDlgCtrl',
	['$scope','$modalInstance','title','data',
	function($scope,$modalInstance,title,data){
		$scope.title=title;
		$scope.keys=Object.keys(data);
		$scope.data=data;
	}]);

