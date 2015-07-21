'use strict';

describe('controllers',function(){
	var modal;
	beforeEach(module('toolboxControllers'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('toolboxApp'));

	it('exist',inject(function($controller){
		var scope={};
		var ctrl=$controller('IndexCtrl',{$scope:scope});
		expect(scope.currentUser).toBe(null);
	}));


});
