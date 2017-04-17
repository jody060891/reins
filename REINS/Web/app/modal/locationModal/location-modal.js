angular.module('HITS').controller('LocationModalCtrl', function ($scope, LocationService, Locations, RoutingUser, $modalInstance, LoadingScreenService) {

    var data = {};
    data.Locations = Locations;
    if (!data.Locations) data.Locations = [];

    $scope.data = data;
    $scope.routingUser = RoutingUser;
    $scope.select = {};
    $scope.select.selectAllLocation = false;
    $scope.select.unselectAllLocation = false;
    var hash = {};
    angular.forEach($scope.data.Locations, function (location, k) {
        hash[location.location_id] = location;
    });

    LoadingScreenService.showLoading();
    var jsonResult = LocationService.FetchAll(function () {
        $scope.locations = jsonResult.data;

        angular.forEach($scope.locations, function (location, k) {
            if (!hash[location.location_id]) {
                data.Locations.push({
                    location_id: location.location_id,
                    is_active: false,
                    Location: location
                });
            }
        });

        LoadingScreenService.hideLoading();
    });

    $scope.select_all_location = function () {
        if (!$scope.select.selectAllLocation) {
            $scope.select.selectAllLocation = true;
            $scope.select.unselectAllLocation = false;
        } else {
            $scope.select.selectAllLocation = false;
            $scope.select.unselectAllLocation = false;
        }
        angular.forEach($scope.data.Locations, function (location) {
            location.is_active = $scope.select.selectAllLocation;

        });
    };

    $scope.unselect_all_location = function () {
        if (!$scope.select.unselectAllLocation) {
            $scope.select.selectAllLocation = false;
            $scope.select.unselectAllLocation = true;
        } else {
            $scope.select.selectAllLocation = false;
            $scope.select.unselectAllLocation = false;
        }
        if ($scope.select.unselectAllLocation) {
            angular.forEach($scope.data.Locations, function (location) {
                location.is_active = false;

            });
        }
    };

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data.Locations);
    };

    //$scope.onSave = function (data) {
    //    $scope.validate.button = false;
    //    toggleAction();

    //    var locations = angular.copy($scope.data.Locations);
    //    $scope.data.Locations = [];

    //    angular.forEach(locations, function (location, k) {
    //        if (location.committee_location_id || location.is_active) {
    //            $scope.data.Locations.push(location);
    //        }
    //    });

    //    var result = LocationService.Save(data, function () {
    //        $modalInstance.close();

    //        toggleAction();
    //    });
    //};
});