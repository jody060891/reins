angular.module('PKBL')
    .directive('toastMessage', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {

            },
            templateUrl: 'directive/toastMessage/toastMessage.html',
            link: function (scope, element, attrs, fn) {
            },
            controller: function ($scope, $timeout, ToastMessageService) {
                ToastMessageService.registerCallback(function () {
                    $scope.alerts = ToastMessageService.getAlerts();
                    $timeout(function () {
                        $scope.alerts = ToastMessageService.removeAlerts();
                    }, 3000);
                });
            }
        };
    });