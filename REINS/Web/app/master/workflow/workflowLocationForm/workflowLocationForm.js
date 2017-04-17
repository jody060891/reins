angular.module('HITS').controller('WorkflowLocationFormCtrl', function ($scope, LocationService, workflow, WorkflowService, $modalInstance) {

    $scope.workflow = angular.copy(workflow);
    $scope.select = {};
    $scope.select.selectAllLocation = false;
    $scope.select.unselectAllLocation = false;
    var hash = {};
    angular.forEach($scope.workflow.Locations, function (location, k) {
        hash[location.location_id] = location;
    });

    var jsonResult = LocationService.FetchAll(function () {
        $scope.locations = jsonResult.data;
        angular.forEach($scope.locations, function (location, k) {
            if (!hash[location.location_id]) {
                $scope.workflow.Locations.push({
                    workflow_id: workflow.workflow_id,
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
        angular.forEach($scope.workflow.Locations, function (location) {
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
            angular.forEach($scope.workflow.Locations, function (location) {
                location.is_active = false;

            });
        }
    };

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {    
        $scope.action = !$scope.action;
    };

    $scope.onSave = function (data) {
        $scope.validate.button = false;
        toggleAction();

        var locations = angular.copy($scope.workflow.Locations);
        $scope.workflow.Locations = [];

        angular.forEach(locations, function (location, k) {
            if (location.workflow_location_id || location.is_active) {
                $scope.workflow.Locations.push(location);
            }
        });

        var result = WorkflowService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});