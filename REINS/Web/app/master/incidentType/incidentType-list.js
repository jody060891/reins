angular.module('HITS')
    .controller('IncidentTypeListCtrl', function ($scope, $modal, $location, ToastMessageService, IncidentTypeService,
        SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_MASTER_DATA_SM_INCIDENT_SETUP_INCIDENT_DATA_VIEW']){
            $location.path('/unauthorized');
        }

        var openModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/incidentType/incidentType-form/incidentType-form.html',
                controller: 'IncidentTypeFormCtrl',
                windowClass: 'modal-large',
                resolve: {
                    incidentTypeData: function () {
                        return angular.copy(data);
                    },
                    incidentTypeLength: function () {
                        return $scope.SearchQuery.total_data;
                    }
                }
            }).result.then(function (result) {

                var messageType = "", message = "";
                if (result) {
                    messageType = "success";
                    message = "Data Saved Succesfully";
                } else {
                    messageType = "danger";
                    message = "Save incident type failed";
                }
                ToastMessageService.addAlerts(messageType, message);
                $scope.Fetch();
            });
        };
        $scope.incidentTypes = {};
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'incident_type_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['incident_type_name', 'description']
            }
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = IncidentTypeService.FetchAllWithPagination($scope.SearchQuery, function () {
                
                var incidentTypeDatas = jsonResult.data.list;
                $scope.incidentTypes = jsonResult.data.list;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;
            });
        };

        $scope.onCreateNew = function () {
            openModal(null);
        };

        $scope.onRowEdit = function (data) {
            openModal(data);
        };

        $scope.onRowDelete = function (data) {
            var sel = confirm("Are you sure you want to delete the Incident Type [" + data.incident_type_name + "] ?");
            if (sel) {
                var jsonResult = IncidentTypeService.Delete(data, function () {
                    var messageType = "", message = "";
                    if (jsonResult) {
                        messageType = "success";
                        message = "Data Deleted Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Delete  incident type failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            }
        };


        $scope.onSearch = function () {
            $scope.Fetch();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
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