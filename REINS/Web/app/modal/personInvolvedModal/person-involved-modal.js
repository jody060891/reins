angular.module('HITS')
    .controller('PersonInvolvedModalCtrl', function ($scope, $modalInstance, attr, mainscope) {
        $scope.attr = attr;
        $scope.mainscope = mainscope;

        $scope.onClose = function () {
            $modalInstance.close();
        };
    });