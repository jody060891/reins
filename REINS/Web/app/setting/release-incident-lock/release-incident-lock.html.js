angular.module('HITS')
    .controller('ReleaseIncidentLockHtmlCtrl', function($scope, $location, IncidentLockService, SessionService, ToastMessageService){
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_RELEASE_LOCK_INCIDENT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.rows = [10, 25, 50, 100];
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'incident_no',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['incident_no', 'locked_by']
            }
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = IncidentLockService.FetchAllWithPagination($scope.SearchQuery, function () {
                $scope.incidentLocks = [];
                var data = jsonResult.data.list;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;
                $scope.incidentLocks = data;
            });
        };

        $scope.onRowDelete = function (data) {
            var sel = confirm("Are you sure you want to delete the lock on " + data.incident_no + " ?");
            if (sel) {
                var jsonResult = IncidentLockService.DeleteLock({incidentLockId: data.incident_lock_id}, function () {
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

        $scope.Fetch();


    });