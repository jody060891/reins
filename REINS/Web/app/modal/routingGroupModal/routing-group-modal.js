angular.module('HITS').controller('RoutingGroupModalCtrl', function ($scope, RoutingGroupService, RoutingGroups, $modalInstance, LoadingScreenService, userRolesData) {

    var data = {};
    data.RoutingGroups = RoutingGroups;
    if (!data.RoutingGroups) data.RoutingGroups = [];

    $scope.data = data;
    $scope.userRolesData = userRolesData;
    $scope.select = {};
    $scope.select.selectAllRoutingGroup = false;
    $scope.select.unselectAllRoutingGroup = false;

    var hash = {};
    angular.forEach($scope.data.RoutingGroups, function (routingGroup, k) {
        hash[routingGroup.routing_group_id] = routingGroup;
    });

    LoadingScreenService.showLoading();
    var jsonResult = RoutingGroupService.FetchAll(function () {
        $scope.routingGroups = jsonResult.data;

        angular.forEach($scope.routingGroups, function (routingGroup, k) {
            if (!hash[routingGroup.routing_group_id]) {
                var valid = false;

                angular.forEach($scope.userRolesData, function(role, k){
                    if (routingGroup.role_id == role.role_id && role.is_active){
                        valid = true;
                    }
                });

                if (valid) {
                    data.RoutingGroups.push({
                        routing_group_id: routingGroup.routing_group_id,
                        is_active: false,
                        RoutingGroup: routingGroup
                    });
                }
            }
        });

        LoadingScreenService.hideLoading();
    });

    $scope.select_all_routingGroup = function () {
        if (!$scope.select.selectAllRoutingGroup) {
            $scope.select.selectAllRoutingGroup = true;
            $scope.select.unselectAllRoutingGroup = false;
        } else {
            $scope.select.selectAllRoutingGroup = false;
            $scope.select.unselectAllRoutingGroup = false;
        }
        angular.forEach($scope.data.RoutingGroups, function (routingGroup) {
            routingGroup.is_active = $scope.select.selectAllRoutingGroup;

        });
    };

    $scope.unselect_all_routingGroup = function () {
        if (!$scope.select.unselectAllRoutingGroup) {
            $scope.select.selectAllRoutingGroup = false;
            $scope.select.unselectAllRoutingGroup = true;
        } else {
            $scope.select.selectAllRoutingGroup = false;
            $scope.select.unselectAllRoutingGroup = false;
        }
        if ($scope.select.unselectAllRoutingGroup) {
            angular.forEach($scope.data.RoutingGroups, function (routingGroup) {
                routingGroup.is_active = false;

            });
        }
    };

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data.RoutingGroups);
    };

    //$scope.onSave = function (data) {
    //    $scope.validate.button = false;
    //    toggleAction();

    //    var routingGroups = angular.copy($scope.data.RoutingGroups);
    //    $scope.data.RoutingGroups = [];

    //    angular.forEach(routingGroups, function (routingGroup, k) {
    //        if (routingGroup.committee_routing_group_id || routingGroup.is_active) {
    //            $scope.data.RoutingGroups.push(routingGroup);
    //        }
    //    });

    //    var result = RoutingGroupService.Save(data, function () {
    //        $modalInstance.close();

    //        toggleAction();
    //    });
    //};
});