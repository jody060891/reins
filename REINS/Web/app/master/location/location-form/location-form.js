angular.module('HITS')
    .controller('LocationFormCtrl', 
        function LocationListCtrl($rootScope, $scope, $resource, $location, $modalInstance, LocationService, locationData) {
            $scope.location = locationData;

            $scope.validate = {};
            $scope.validate.button = true;

            if ($scope.location.location_name) {
                $scope.validate.location_name = false;
            }

            $scope.isValid = function () {
                if ($scope.location.location_name) {
                    $scope.validate.location_name = false;
                } else {
                    $scope.validate.location_name = true;
                }
                

                if (!$scope.validate.location_name) {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.onSave = function (locationData) {
                if ($scope.isValid()) {
                    $scope.validate.button = false;
                    var jsonResult = LocationService.Save(locationData, function () {
                        var result = true;
                        $modalInstance.close(result);

                    });
                }
            };

        });
