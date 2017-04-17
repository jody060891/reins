angular.module('HITS').controller('AddlocationformCtrl', function ($scope, LocationService, routingGroup, RoutingGroupService, $modalInstance) {

    $scope.routingGroup = routingGroup;

    var hash = {};
    angular.forEach($scope.routingGroup.Locations, function (loc, k) {
        hash[loc.location_id] = loc;
    });

    var jsonResult = LocationService.FetchAll(function () {
        $scope.locations = jsonResult.data;

        angular.forEach($scope.locations, function (loc, k) {
            if (!hash[loc.location_id]) {
                routingGroup.Locations.push({
                    routing_group_id : routingGroup.routing_group_id,
                    location_id : loc.location_id,
                    is_active: false,
                    Location: loc
                });
            }
        });
    });

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSave = function (data) {
        toggleAction();

        var locations = angular.copy($scope.routingGroup.Locations);
        $scope.routingGroup.Locations = [];

        angular.forEach(locations, function (loc, k) {
            if (loc.routing_location_id || loc.is_active) {
                $scope.routingGroup.Locations.push(loc);
            }
        });

        var result = RoutingGroupService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});