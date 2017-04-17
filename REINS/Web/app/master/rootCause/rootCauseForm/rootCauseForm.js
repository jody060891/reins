angular.module('HITS')
    .controller('RootcauseformCtrl', function ($scope, rootCause, RootCauseService, $modalInstance, RootCauseCategoryService) {

        $scope.rootCause = rootCause;

        var jsonResult = RootCauseCategoryService.FetchAll(function () {
            $scope.rootCauseCategorys = jsonResult.data;
        });

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSave = function (data) {
            toggleAction();
            var result = RootCauseService.Save(data, function () {
                $modalInstance.close();

                toggleAction();
            });
        };

    });