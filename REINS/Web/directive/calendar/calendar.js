angular.module('PKBL').directive('calendar', function() {
	return {
		restrict: 'A',
        require: 'ngModel',
        scope: {
            max : "="
        },
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'dd-mm-yy',
                maxDate: scope.max,
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
	};
});