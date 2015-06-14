'use strict';

function showMsgBox($modal,msg,btnOk,btnCancel,cbOk,cbCancel){
	var modalInstance=$modal.open({
		animation:true,
		templateUrl:'partials/modalMsgBox.html',
		controller:'mdlMsgBoxCtrl',
		resolve:{
			msg:function(){
				return msg;
			},
			btnOk:function(){
				return btnOk;
			},
			btnCancel:function(){
				return btnCancel;
			}
		}
	});

	modalInstance.result.then(cbOk,cbCancel);
};

toolboxControllers.controller('mdlMsgBoxCtrl',['$scope','$modalInstance','msg','btnOk','btnCancel',
		function($scope,$modalInstance,msg,btnOk,btnCancel){
			$scope.msg=msg;

			$scope.clickOk=function(){
				$modalInstance.close();
			};

			$scope.clickCancel=function(){
				$modalInstance.dismiss();
			};
		}]);

