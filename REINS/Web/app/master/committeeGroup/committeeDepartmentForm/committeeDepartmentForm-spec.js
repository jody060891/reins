describe('CommitteedepartmentformCtrl', function() {

	beforeEach(module('HITS'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('CommitteedepartmentformCtrl', {$scope: scope});
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});