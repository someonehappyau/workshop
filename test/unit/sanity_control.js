'use strict';

describe('controllers',function(){

	beforeEach(module('toolboxControllers'));
	beforeEach(module('$modal'));

	it('exist',inject(function($controller){
		var scope={};
		var ctrl=$controller('IndexCtrl',{$scope:scope});
		expect(scope.currentUser).equals(null);
	}));


});
