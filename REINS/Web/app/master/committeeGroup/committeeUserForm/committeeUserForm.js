angular.module('HITS').controller('CommitteeuserformCtrl', function ($scope, UserService, committeeGroupId, CommitteeGroupService, $modalInstance, LoadingScreenService, UserSessionData) {

    $scope.committeeGroupId = committeeGroupId;

    var jsonResultCommittee = CommitteeGroupService.FetchOne({committeeGroupId: $scope.committeeGroupId}, function(){
        $scope.committeeGroup = jsonResultCommittee.data;

        $scope.select = {};
        $scope.select.selectAllUser = false;
        $scope.select.unselectAllUser = false;
        var hash = {};
        angular.forEach($scope.committeeGroup.Users, function (user, k) {
            hash[user.user_id] = user;
        });

        var jsonResult = UserService.FetchAll({
            institutionId: UserSessionData.institution_id
        }, function () {
            $scope.users = jsonResult.data;

            angular.forEach($scope.users, function (user, k) {
                if (!hash[user.user_id]) {
                    $scope.committeeGroup.Users.push({
                        committee_group_id: $scope.committeeGroup.committee_group_id,
                        user_id: user.user_id,
                        is_active: false,
                        User: user
                    });
                }
            });
        });

        $scope.validate = {};
        $scope.validate.button = true;
    });

    $scope.select_all_user = function () {
        if (!$scope.select.selectAllUser) {
            $scope.select.selectAllUser = true;
            $scope.select.unselectAllUser = false;
        } else {
            $scope.select.selectAllUser = false;
            $scope.select.unselectAllUser = false;
        }
        angular.forEach($scope.committeeGroup.Users, function (user) {
            user.is_active = $scope.select.selectAllUser;

        });
    };

    $scope.unselect_all_user = function () {
        if (!$scope.select.unselectAllUser) {
            $scope.select.selectAllUser = false;
            $scope.select.unselectAllUser = true;
        } else {
            $scope.select.selectAllUser = false;
            $scope.select.unselectAllUser = false;
        }
        if ($scope.select.unselectAllUser) {
            angular.forEach($scope.committeeGroup.Users, function (user) {
                user.is_active = false;

            });
        }
    };



    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSave = function () {
        $scope.validate.button = false;
        toggleAction();

        //var users = angular.copy($scope.committeeGroup.Users);
        //$scope.committeeGroup.Users = [];
        //
        //angular.forEach(users, function (user, k) {
        //    if (user.committee_user_id || user.is_active) {
        //        $scope.committeeGroup.Users.push(user);
        //    }
        //});
        LoadingScreenService.showLoading();
        var result = CommitteeGroupService.Save($scope.committeeGroup, function () {
            LoadingScreenService.hideLoading();
            $modalInstance.close();

            toggleAction();
        });
    };
});