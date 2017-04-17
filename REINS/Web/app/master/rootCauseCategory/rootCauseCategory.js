angular.module('HITS').controller('RootcausecategoryCtrl', function ($scope, RootCauseCategoryService, $modal, SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    var openModal = function (data) {
        $modal.open({
            templateUrl: 'app/master/rootCauseCategory/rootCauseCategoryForm/rootCauseCategoryForm.html',
            controller: 'RootcausecategoryformCtrl',
            backdrop: true,
            resolve: {
                rootCauseCategory: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.onCreateNew = function () {
        openModal({});
    };

    $scope.onRowEdit = function (data) {
        openModal(angular.copy(data));
    };

    $scope.onRowDelete = function (data) {
        var sel = confirm("Are you sure you want to delete the Root Cause Category [" + data.description + "] ?");
        if (sel) {
            var jsonResult = RootCauseCategoryService.Delete(data, function () {
                $scope.Fetch();
            });
        }
    };

    $scope.Fetch = function () {
        var jsonResult = RootCauseCategoryService.FetchAll(function () {
            $scope.rootCauseCategorys = jsonResult.data;
        });
    };

    $scope.Fetch();

});