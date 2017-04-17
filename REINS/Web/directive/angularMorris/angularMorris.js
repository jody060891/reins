angular.module('PKBL')
    .directive('linechartSetting', function() {

        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                scope.updateModel = function(item) {
                    ngModelCtrl.$setViewValue(item);
                }


            }
        };

    });