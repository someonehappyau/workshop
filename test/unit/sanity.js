'use strict';

describe('User Control',function(){
	beforeEach(module('toolboxApp'));

	it('check the existence of authService',inject(function(AuthService){
		expect(AuthService).toBeDefined();
	}));

	it('check svcUser',inject(function(UserSvc){
		expect(UserSvc).toBeDefined();
	}));
});
