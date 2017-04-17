angular.module('HITS').controller('RootcauseCtrl', function ($scope, RootCauseService, $modal, SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    var openModal = function (data) {
        $modal.open({
            templateUrl: 'app/master/rootCause/rootCauseForm/rootCauseForm.html',
            controller: 'RootcauseformCtrl',
            backdrop: true,
            resolve: {
                rootCause: function () {
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
        var sel = confirm("Are you sure you want to delete the Root Cause [" + data.description + "] ?");
        if (sel) {
            var jsonResult = RootCauseService.Delete(data, function () {
                $scope.Fetch();
            });
        }
    };

    $scope.Fetch = function () {
        var jsonResult = RootCauseService.FetchAll(function () {
            $scope.rootCauses = jsonResult.data;
        });
    };

    $scope.Fetch();

});