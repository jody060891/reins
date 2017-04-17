angular.module('HITS')
    .controller('AlertModalCtrl', function ($scope, $modalInstance, attr, $timeout) {
        $scope.dynamicFormScope = $scope;
        $scope.attr = attr;

        $scope.onClose = function () {
            $modalInstance.close();
        };
    });