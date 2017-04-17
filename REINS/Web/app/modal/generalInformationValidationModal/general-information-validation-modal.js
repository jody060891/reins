angular.module('HITS')
    .controller('AlertModalCtrl', function ($scope, $modalInstance, attr) {
        $scope.attr = attr;

        $scope.onClose = function () {
            $modalInstance.close();
        };
    });