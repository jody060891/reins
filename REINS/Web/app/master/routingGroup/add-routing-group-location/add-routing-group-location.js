angular.module('HITS')
    .controller('AddRoutingGroupLocationCtrl', function ($scope, LocationService, RoutingGroupService, routingUser, routingGroup, $modalInstance, LoadingScreenService) {
        $scope.routingUser = routingUser;
        $scope.routingGroup = routingGroup;
        $scope.select = {};

        $scope.validate = {};
        $scope.validate.button = true;

        $scope.select.selectAllLoc = false;
        $scope.select.unselectAllLoc = false;
        var hash = {};
        angular.forEach($scope.routingUser.RoutingLocations, function (loc, k) {
            hash[loc.location_id] = loc;
        });

        var jsonResult = LocationService.FetchAll(function () {
            $scope.locations = jsonResult.data;

            $scope.tempRoutingLocations = angular.copy($scope.routingUser.RoutingLocations);
            if ($scope.tempRoutingLocations == null)
                $scope.tempRoutingLocations = [];

            angular.forEach($scope.locations, function (loc, k) {
                if (!hash[loc.location_id]) {
                    $scope.tempRoutingLocations.push({
                        routing_user_id: $scope.routingUser.routing_user_id,
                        location_id: loc.location_id,
                        is_active: false,
                        Location: loc
                    });
                }
            });
        });

        $scope.select_all_location = function () {
            if (!$scope.select.selectAllLoc) {
                $scope.select.selectAllLoc = true;
                $scope.select.unselectAllLoc = false;
            } else {
                $scope.select.selectAllLoc = false;
                $scope.select.unselectAllLoc = false;
            }
            angular.forEach($scope.tempRoutingLocations, function (loc) {
                loc.is_active = $scope.select.selectAllLoc;

            });
        };

        $scope.unselect_all_location = function () {
            if (!$scope.select.unselectAllLoc) {
                $scope.select.selectAllLoc = false;
                $scope.select.unselectAllLoc = true;
            } else {
                $scope.select.selectAllLoc = false;
                $scope.select.unselectAllLoc = false;
            }
            if ($scope.select.unselectAllLoc) {
                angular.forEach($scope.tempRoutingLocations, function (loc) {
                    loc.is_active = false;

                });
            }
        };

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSave = function (data) {
            $scope.validate.button = false;
            LoadingScreenService.showLoading();
            
            toggleAction();

            var locations = angular.copy($scope.tempRoutingLocations);
            $scope.routingUser.RoutingLocations = [];

            angular.forEach(locations, function (loc, k) {
                if (loc.routing_location_id || loc.is_active) {
                    $scope.routingUser.RoutingLocations.push(loc);
                }
            });
            //var index = $scope.routingGroup.RoutingUsers.indexOf($scope.routingUser);
            //$scope.routingGroup.RoutingUsers[index] = $scope.routingUser;

            var index = -1;
            var i = 0;
            angular.forEach($scope.routingGroup.RoutingUsers, function(rUser, key){
                if (rUser.routing_user_id == $scope.routingUser.routing_user_id){
                    index = i;
                }
                i++;
            });
            if (index >= 0){
                $scope.routingGroup.RoutingUsers[index] = $scope.routingUser;
            }

            var jsonResult = RoutingGroupService.SaveUserRoutingLocation({
                routingUserId: $scope.routingUser.routing_user_id,
                listLocation: $scope.routingUser.RoutingLocations,
                isAllLocation: $scope.routingUser.is_all_location
            }, function () {
                toggleAction();
                LoadingScreenService.hideLoading();
                $modalInstance.close($scope.routingUser);
            }, function () {
                toggleAction();
                LoadingScreenService.hideLoading();
                $modalInstance.close(null);
                $scope.validate.button = true;
            });

            //var jsonResult = RoutingGroupService.Save($scope.routingGroup, function () {
            //    toggleAction();
            //    LoadingScreenService.hideLoading();
            //    $modalInstance.close($scope.routingUser);
            //}, function () {
            //    toggleAction();
            //    LoadingScreenService.hideLoading();
            //    $modalInstance.close(null);
            //    $scope.validate.button = true;
            //});
        };
    });