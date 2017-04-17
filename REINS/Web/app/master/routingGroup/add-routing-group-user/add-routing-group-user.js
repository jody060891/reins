angular.module('HITS')
    .controller('AddRoutingGroupUserCtrl', function ($scope, $q, $modalInstance, routingGroupId, RoutingGroupService, UserService, LoadingScreenService, UserSessionData) {
        $scope. routingGroupId= routingGroupId;
        var hash = {};
        $scope.fetchRoutingGroup = function(){
            var d = $q.defer();

            var jsonResultRoutingGroup = RoutingGroupService.FetchOne(
                { routingGroupId: $scope.routingGroupId },
                function(){
                   var routingGroup = jsonResultRoutingGroup.data;
                    d.resolve(routingGroup);
                });

            return d.promise;
        };

        $scope.Fetch = function () {
            var jsonResult = UserService.FetchAllForRoutingGroup({
                institutionId: UserSessionData.institution_id,
                routingGroupId: $scope.routingGroupId
            }, function () {
                $scope.users = [];
                $scope.users = jsonResult.data;

                angular.forEach($scope.users, function (user, k) {
                    if (!hash[user.user_id]) {
                        $scope.routingGroup.RoutingUsers.push({
                            routing_group_id: $scope.routingGroup.routing_group_id,
                            user_id: user.user_id,
                            is_active: false,
                            User: user,
                            routing_user_id: 0
                        });
                    }
                });
                //var dataUsers = jsonResult.data;
                //$scope.users = dataUsers;
                //
                //angular.forEach($scope.users, function (u, k) {
                //    if (hash[u.user_id]) {
                //        u.is_available = false;
                //    } else {
                //        u.is_available = true;
                //    }
                //});
            });
        };

        $scope.validate = {};
        $scope.validate.button = true;
        $scope.select = {};
        $scope.select.selectAllUser = false;
        $scope.select.unselectAllUser = false;

        $q.all([$scope.fetchRoutingGroup()]).then(function(data){
            $scope.routingGroup = data[0];
            angular.forEach($scope.routingGroup.RoutingUsers, function (routingUser, k) {
                hash[routingUser.user_id] = routingUser;
            });
            $scope.Fetch();
        });



        $scope.select_all_user = function () {
            if (!$scope.select.selectAllUser) {
                $scope.select.selectAllUser = true;
                $scope.select.unselectAllUser = false;
            } else {
                $scope.select.selectAllUser = false;
                $scope.select.unselectAllUser = false;
            }
            if ($scope.routingGroup.RoutingUsers) {
                angular.forEach($scope.routingGroup.RoutingUsers, function (user) {
                    user.is_active = $scope.select.selectAllUser;

                });
            }
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
                if ($scope.routingGroup.RoutingUsers) {
                    angular.forEach($scope.routingGroup.RoutingUsers, function (user) {
                        user.is_active = false;

                    });
                }
            }
        };



        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSave = function (data) {
            $scope.validate.button = false;
            LoadingScreenService.showLoading();
            
            toggleAction();

            //angular.forEach($scope.users, function (user, k) {
            //    if (user.is_selected) {
            //        var newRoutingUser = {
            //            routing_user_id : 0,
            //            routing_group_id : $scope.routingGroup.routing_group_id,
            //            user_id : user.user_id,
            //            is_active : true,
            //            User : user,
            //            RoutingGroup : $scope.RoutingGroup
            //        };
            //
            //        $scope.routingGroup.RoutingUsers.push(newRoutingUser);
            //    }
            //});

            var users = [];//angular.copy($scope.routingGroup.RoutingUsers);
            angular.forEach($scope.routingGroup.RoutingUsers, function (user, k) {
                if (user.routing_user_id > 0 || user.is_active) {
                    users.push(user);
                }
            });
            $scope.routingGroup.RoutingUsers = [];

            angular.forEach(users, function (user, k) {
                $scope.routingGroup.RoutingUsers.push(user);
            });

            var jsonResult = RoutingGroupService.Save($scope.routingGroup, function () {
                toggleAction();
                LoadingScreenService.hideLoading();
                $modalInstance.close($scope.routingGroup);
            }, function () {
                toggleAction();
                LoadingScreenService.hideLoading();
                $modalInstance.close(null);
                $scope.validate.button = true;
            });
            
        };
    });