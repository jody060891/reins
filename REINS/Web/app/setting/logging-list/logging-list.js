angular.module('HITS')
    .controller('LoggingListCtrl', function($scope, $location, $timeout, LogService, SessionService, ToastMessageService){
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_LOG_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.today = new Date();
        $scope.filter = {};
        $scope.filter.level = "ALL";
        $scope.rows = [10, 25, 50, 100];
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'Date',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['Date', 'Level', 'Logger', 'Message', 'Exception']
            }
        };

        $scope.datePickerOpen = function (id) {
            $timeout(function () {
                $("#" + id).focus();
            });
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = LogService.FetchAllWithPagination({
                searchQuery: $scope.SearchQuery,
                level: $scope.filter.level,
                from: $scope.filter.from_date,
                to: $scope.filter.to_date
            }, function () {
                $scope.logs = [];
                var data = jsonResult.data.list;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;
                $scope.logs = data;
            });
        };


        $scope.onSearch = function() {
            $scope.Fetch();
        };

        $scope.onPageChanged = function(page){
            $scope.SearchQuery.page = page;
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



        $scope.onLevelChange = function(){
            $scope.Fetch();
        };

        $scope.Fetch();

    });