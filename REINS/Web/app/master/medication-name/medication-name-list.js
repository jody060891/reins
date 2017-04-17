angular.module('HITS')
    .controller('MedicationNameListCtrl',function($rootScope, $scope, $resource, $location, $modal, $timeout, MedicationNameService,
                                                  ToastMessageService, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);

        if (!$scope.currentAcl['SM_MASTER_DATA_MEDICATION_NAME_VIEW']){
            $location.path('/unauthorized');
        }

        var openModal = function(data) {
            $modal.open({
                templateUrl: 'app/master/medication-name/form/medication-name.html',
                controller: 'MedicationNameCtrl',
                resolve: {
                    medicationData: function () {
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
                    message = "Save Medication Name failed";
                }
                ToastMessageService.addAlerts(messageType, message);
                $scope.Fetch();
            });
        };
        $scope.rows = [10, 25, 50, 100];
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'medication_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['medication_name']
            }
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = MedicationNameService.FetchAllWithPagination($scope.SearchQuery, function () {
                $scope.medications = [];
                var data_medications = jsonResult.data.list;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;
                $scope.medications = data_medications;
            });
        };

        $scope.onCreateNew = function () {
            openModal({});
        };

        $scope.onRowEdit = function (data) {
            openModal(angular.copy(data));
        };

        $scope.onRowDelete = function (data) {
            var sel = confirm("Are you sure you want to delete the Medication Name [" + data.medication_name+ "] ?");
            if (sel) {
                var jsonResult = MedicationNameService.Delete(data, function () {
                    var messageType = "", message = "";
                    if (jsonResult) {
                        messageType = "success";
                        message = "Data Deleted Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Delete Medication Name failed";
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