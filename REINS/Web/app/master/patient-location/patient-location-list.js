angular.module('HITS')
    .controller('PatienLocationListCtrl',
    function PatientLocationListCtrl($rootScope, $scope, $resource, $location, $modal, PatientLocationService,
        ToastMessageService, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        var openModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/patient-location/patient-form/patient-location-form.html',
                controller: 'PatientLocationFormCtrl',
                resolve: {
                    patientLocationData: function () {
                        return data;
                    }
                }
            }).result.then(function (result) {
                // ToastMessageService.addAlerts('Test');
                $scope.Fetch();
            });
        };

        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'patient_location_code',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['patient_location_code', 'patient_location_unit_name', 'patient_location_unit_short_name']
            }
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = PatientLocationService.FetchAllWithPagination($scope.SearchQuery, function () {
                $scope.patientLocations = [];
                var data_patientLocations = jsonResult.data.list;
                var i = 0;
                $scope.patientLocations = data_patientLocations;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;


                //$rootScope.hideLoading();
            });
        };

        $scope.onCreateNew = function () {

            openModal({});
        };

        $scope.onRowEdit = function (patientLocationData) {

            openModal(angular.copy(patientLocationData));
        };

        $scope.onRowDelete = function (patientLocationData) {
            var sel = confirm("Are you sure you want to delete the Patient Location [" + patientLocationData.patient_location_unit_name+ "] ?");
            if (sel) {
                var jsonResult = PatientLocationService.Delete(patientLocationData, function () {
                    $scope.Fetch();
                });
            }
        };


        $scope.onSearch = function () {
            $scope.Fetch();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
            //console.log($scope.SearchQuery);
            $scope.Fetch();
        };

        $scope.onSort = function (sortField) {
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
