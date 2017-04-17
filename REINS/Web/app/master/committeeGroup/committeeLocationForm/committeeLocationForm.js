angular.module('HITS').controller('CommitteelocationformCtrl', function ($scope, LocationService, committeeGroup, CommitteeGroupService, $modalInstance) {

    if (!committeeGroup.Locations) committeeGroup.Locations = [];

    $scope.committeeGroup = committeeGroup;
    $scope.select = {};
    $scope.select.selectAllLocation = false;
    $scope.select.unselectAllLocation = false;
    var hash = {};
    angular.forEach($scope.committeeGroup.Locations, function (location, k) {
        hash[location.location_id] = location;
    });

    var jsonResult = LocationService.FetchAll(function () {
        $scope.locations = jsonResult.data;

        angular.forEach($scope.locations, function (location, k) {
            if (!hash[location.location_id]) {
                committeeGroup.Locations.push({
                    committee_group_id: committeeGroup.committee_group_id,
                    location_id: location.location_id,
                    is_active: false,
                    Location: location
                });
            }
        });
    });

    $scope.select_all_location = function () {
        if (!$scope.select.selectAllLocation) {
            $scope.select.selectAllLocation = true;
            $scope.select.unselectAllLocation = false;
        } else {
            $scope.select.selectAllLocation = false;
            $scope.select.unselectAllLocation = false;
        }
        angular.forEach($scope.committeeGroup.Locations, function (location) {
            location.is_active = $scope.select.selectAllLocation;

        });
    }

    $scope.unselect_all_location = function () {
        if (!$scope.select.unselectAllLocation) {
            $scope.select.selectAllLocation = false;
            $scope.select.unselectAllLocation = true;
        } else {
            $scope.select.selectAllLocation = false;
            $scope.select.unselectAllLocation = false;
        }
        if ($scope.select.unselectAllLocation) {
            angular.forEach($scope.committeeGroup.Locations, function (location) {
                location.is_active = false;

            });
        }
    }

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data);
    }

    $scope.onSave = function (data) {
        $scope.validate.button = false;
        toggleAction();

        var locations = angular.copy($scope.committeeGroup.Locations);
        $scope.committeeGroup.Locations = [];

        angular.forEach(locations, function (location, k) {
            if (location.committee_location_id || location.is_active) {
                $scope.committeeGroup.Locations.push(location);
            }
        });

        var result = CommitteeGroupService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});