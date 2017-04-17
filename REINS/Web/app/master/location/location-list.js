angular.module('HITS')
    .controller('LocationListCtrl', 
        function LocationListCtrl($rootScope, $scope, $resource, $location, $modal, $timeout, LocationService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);

            if (!$scope.currentAcl['SM_MASTER_DATA_LOCATION_VIEW']){
                $location.path('/unauthorized');
            }

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
                        message = "Save location failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };
            $scope.rows = [10, 25, 50, 100];
            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'location_name',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['location_name']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = LocationService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.locations = [];
                    var data_locations = jsonResult.data.list;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
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
                            message = "Delete location failed";
                        }
                        ToastMessageService.addAlerts(messageType, message);
                        $scope.Fetch();
                    });
                }
            };
            

            $scope.onSearch = function() {
                $scope.Fetch();
            };

            $scope.onPageChanged = function(page){
                $scope.SearchQuery.page = page;
                //console.log($scope.SearchQuery);
                $scope.Fetch();
            };

            $scope.onSort = function(sortField){
                if ($scope.SearchQuery.sort_by == sortField)
                    $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
                else
                    $scope.SearchQuery.is_sort_asc = true;
                $scope.SearchQuery.sort_by = sortField;
                $scope.Fetch();
            };

            $scope.onKeyPress = function ($event) {
                if ($event.keyCode === 13) {
                    $scope.onSearch();
                }
            };

            $scope.Fetch();
        });
