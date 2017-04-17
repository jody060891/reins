angular.module('PKBL').directive('decimalOnlyInput', function() {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                var clean = "";
                if (val != null && val.length > 0) {
                    clean = val.replace(/[^0-9\.]+/g, '');
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                }
                if (attrs.max && clean != "" && parseInt(clean) > parseInt(attrs.max)) {
                    clean = attrs.max;
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }

                if (attrs.min && clean != "" && clean < attrs.min) {
                    clean = attrs.min;
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }

                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});