angular.module('HITS')
    .controller('LocationFormCtrl', 
        function LocationListCtrl($rootScope, $scope, $resource, $location, $modalInstance, LocationService, locationData) {
            $scope.location = locationData;

            $scope.onSave = function(locationData) {
                var jsonResult = LocationService.Save(locationData, function () {
                    var result = true;
                    $modalInstance.close(result);

                });
            };

        });
