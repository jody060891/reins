angular.module('HITS')
    .controller('RoutingGroupUserCtrl', function ($scope, $modal, $location, RoutingGroupService,
        RoutingGroupFormService, ToastMessageService, SessionService, UserAclSessionData, UserSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_ROUTING_GROUP_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.institution_id = UserSessionData.institution_id;
        $scope.routingGroupData = RoutingGroupFormService.get();

        var jsonResultRoutingGroup = RoutingGroupService.FetchOne(
            { routingGroupId: $scope.routingGroupData.routing_group_id },
            function(){
            $scope.routingGroup = jsonResultRoutingGroup.data;
        });

        $scope.filterRoutingUser = function(routingUser){
            if (routingUser.is_active && routingUser.User.institution_id == $scope.institution_id)
                return true;
            return false;
        };

        $scope.onAddUser = function(data) {
            $modal.open({
                templateUrl: 'app/master/routingGroup/add-routing-group-user/add-routing-group-user.html',
                controller: 'AddRoutingGroupUserCtrl',
                backdrop: true,
                windowClass: 'modal-medium',
                resolve: {
                    routingGroupId: function() {
                        return $scope.routingGroup.routing_group_id;//angular.copy(data);
                    }
                }
            }).result.then(function (result) {
                var messageType = "", message = "";
                if (result) {
                    messageType = "success";
                    message = "Data Saved Succesfully";
                } else {
                    messageType = "danger";
                    message = "Save routing group user failed";
                }
                ToastMessageService.addAlerts(messageType, message);

                var jsonResult = RoutingGroupService.FetchOne({
                    routingGroupId: $scope.routingGroup.routing_group_id
                }, function() {
                    $scope.routingGroup = jsonResult.data;
                });
            });
        };

        $scope.onManageLocation = function (data, routingGroup) {
            var index = $scope.routingGroup.RoutingUsers.indexOf(data);
            $modal.open({
                templateUrl: 'app/master/routingGroup/add-routing-group-location/add-routing-group-location.html',
                controller: 'AddRoutingGroupLocationCtrl',
                backdrop: true,
                windowClass: 'modal-medium',
                resolve: {
                    routingUser: function () {
                        return angular.copy(data);
                    },
                    routingGroup: function() {
                        return angular.copy(routingGroup);
                    }
                }
            }).result.then(function (result) {
                var messageType = "", message = "";
                if (result) {
                    messageType = "success";
                    message = "Data Saved Succesfully";
                } else {
                    messageType = "danger";
                    message = "Save routing group location failed";
                }
                ToastMessageService.addAlerts(messageType, message);

                var jsonResult = RoutingGroupService.FetchOne({
                    routingGroupId: $scope.routingGroup.routing_group_id
                }, function () {
                    $scope.routingGroup = jsonResult.data;
                });
            });
        };

        $scope.onManageDepartment = function (data, routingGroup) {
            var index = $scope.routingGroup.RoutingUsers.indexOf(data);
            $modal.open({
                templateUrl: 'app/master/routingGroup/add-routing-group-department/add-routing-group-department.html',
                controller: 'AddRoutingGroupDepartmentCtrl',
                backdrop: true,
                windowClass: 'modal-medium',
                resolve: {
                    routingUser: function () {
                        return angular.copy(data);
                    },
                    routingGroup: function() {
                        return angular.copy(routingGroup);
                    }
                }
            }).result.then(function (result) {
                    var messageType = "", message = "";
                    if (result) {
                        messageType = "success";
                        message = "Data Saved Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Save routing group department failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);

                    var jsonResult = RoutingGroupService.FetchOne({
                        routingGroupId: $scope.routingGroup.routing_group_id
                    }, function () {
                        $scope.routingGroup = jsonResult.data;
                    });
                });
        };

        $scope.onBack = function() {
            $location.path("/routingGroup");
        };

        $scope.onRowDelete = function (data) {
            var sel = confirm("Are you sure you want to delete the User Data [" + data.User.name + "] ?");
            if (sel){
                var jsonResult = RoutingGroupService.DeleteRoutingUser({
                    routingUserId: data.routing_user_id
                }, function () {
                    if (jsonResult.data.IsSuccess) {
                        var result = RoutingGroupService.FetchOne({
                            routingGroupId: $scope.routingGroup.routing_group_id
                        }, function() {
                            $scope.routingGroup = result.data;
                        });
                    } else {
                        ToastMessageService.addAlerts("danger", "Delete routing group user failed");
                    }
                });
            }
        };
    });