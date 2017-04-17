angular.module('HITS')
    .controller('LocationListCtrl', 
        function LocationListCtrl($rootScope, $scope, $resource, $location, $modal, $timeout, LocationService, ToastMessageService) {
            var openModal = function(data) {
                $modal.open({
                    templateUrl: 'app/master/location/location-form/location-form.html',
                    controller: 'LocationFormCtrl',
                    resolve: {
                        locationData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                    
                    var messageType = "", message = "";
                    if (result) {
                        messageType = "success";
                        message = "Data Saved Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Error Saving Data";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.Fetch = function () {
                var jsonResult = LocationService.FetchAll(function () {
                    $scope.locations = [];
                    var data_locations = jsonResult.data;
                    $scope.locations = data_locations;
                });
            };

            $scope.onCreateNew = function () {
                openModal({});
            };

            $scope.onRowEdit = function (locationData) {
                openModal(angular.copy(locationData));
            };

            $scope.onRowDelete = function (locationData) {
                var sel = confirm("Are you sure you want to delete the Location [" + locationData.location_name+ "] ?");
                if (sel) {
                    var jsonResult = LocationService.Delete(locationData, function () {
                        var messageType = "", message = "";
                        if (jsonResult) {
                            messageType = "success";
                            message = "Data Deleted Succesfully";
                        } else {
                            messageType = "danger";
                            message = "Error Deleting Data";
                        }
                        ToastMessageService.addAlerts(messageType, message);
                        $scope.Fetch();
                    });
                }
            };
            

            $scope.OnSearch = function() {
                $scope.Fetch();
            };
            

            $scope.Fetch();
        });
