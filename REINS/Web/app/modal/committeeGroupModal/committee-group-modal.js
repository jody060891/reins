angular.module('HITS').controller('CommitteeGroupModalCtrl', function ($scope, CommitteeGroupService, CommitteeGroups, $modalInstance, LoadingScreenService, userRolesData) {
    $scope.userRolesData = userRolesData;
    var data = {};
    data.CommitteeGroups = CommitteeGroups;
    if (!data.CommitteeGroups) data.CommitteeGroups = [];

    $scope.data = data;
    $scope.select = {};
    $scope.select.selectAllCommitteeGroup = false;
    $scope.select.unselectAllCommitteeGroup = false;
    var hash = {};
    angular.forEach($scope.data.CommitteeGroups, function (committeeGroup, k) {
        hash[committeeGroup.committee_group_id] = committeeGroup;
    });

    LoadingScreenService.showLoading();
    var jsonResult = CommitteeGroupService.FetchAll(function () {
        $scope.committeeGroups = jsonResult.data;

        angular.forEach($scope.committeeGroups, function (committeeGroup, k) {
            if (!hash[committeeGroup.committee_group_id]) {
                var valid = false;

                angular.forEach($scope.userRolesData, function(role, k){
                    if (committeeGroup.role_id == role.role_id && role.is_active){
                        valid = true;
                    }
                });

                if (valid) {
                    data.CommitteeGroups.push({
                        committee_group_id: committeeGroup.committee_group_id,
                        is_active: false,
                        CommitteeGroup: committeeGroup
                    });
                }
            }
        });

        LoadingScreenService.hideLoading();
    });

    $scope.select_all_committeeGroup = function () {
        if (!$scope.select.selectAllCommitteeGroup) {
            $scope.select.selectAllCommitteeGroup = true;
            $scope.select.unselectAllCommitteeGroup = false;
        } else {
            $scope.select.selectAllCommitteeGroup = false;
            $scope.select.unselectAllCommitteeGroup = false;
        }
        angular.forEach($scope.data.CommitteeGroups, function (committeeGroup) {
            committeeGroup.is_active = $scope.select.selectAllCommitteeGroup;

        });
    };

    $scope.unselect_all_committeeGroup = function () {
        if (!$scope.select.unselectAllCommitteeGroup) {
            $scope.select.selectAllCommitteeGroup = false;
            $scope.select.unselectAllCommitteeGroup = true;
        } else {
            $scope.select.selectAllCommitteeGroup = false;
            $scope.select.unselectAllCommitteeGroup = false;
        }
        if ($scope.select.unselectAllCommitteeGroup) {
            angular.forEach($scope.data.CommitteeGroups, function (committeeGroup) {
                committeeGroup.is_active = false;

            });
        }
    };

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data.CommitteeGroups);
    };

    //$scope.onSave = function (data) {
    //    $scope.validate.button = false;
    //    toggleAction();

    //    var committeeGroups = angular.copy($scope.data.CommitteeGroups);
    //    $scope.data.CommitteeGroups = [];

    //    angular.forEach(committeeGroups, function (committeeGroup, k) {
    //        if (committeeGroup.committee_committee_group_id || committeeGroup.is_active) {
    //            $scope.data.CommitteeGroups.push(committeeGroup);
    //        }
    //    });

    //    var result = CommitteeGroupService.Save(data, function () {
    //        $modalInstance.close();

    //        toggleAction();
    //    });
    //};
});