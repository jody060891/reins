angular.module('HITS')
    .controller('RootcausecategoryformCtrl', function ($scope, rootCauseCategory, RootCauseCategoryService, $modalInstance) {

        $scope.rootCauseCategory = rootCauseCategory;

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSave = function (data) {
            toggleAction();
            var result = RootCauseCategoryService.Save(data, function () {
                $modalInstance.close();

                toggleAction();
            });
        };

    });