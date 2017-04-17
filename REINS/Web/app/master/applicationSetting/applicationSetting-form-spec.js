describe('ApplicationSettingFormCtrl', function() {

	beforeEach(module('HITS'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('ApplicationSettingFormCtrl', { $scope: scope });
    }));	

	it('should ...', inject(function() {

		expect(1).toEqual(1);
		
	}));

});