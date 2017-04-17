describe('momentDateFilter', function () {

	beforeEach(module('HITS'));

	it('should ...', inject(function($filter) {

        var filter = $filter('dateFilter');

		expect(filter('input')).toEqual('output');

	}));

});