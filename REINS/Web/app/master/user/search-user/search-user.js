angular.module('HITS')
    .controller('SearchUserCtrl', function ($scope, keywordData, TempSapHrService, $modalInstance) {
        $scope.isValid = true;
        $scope.keyword = "";
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'employee_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['employee_name', 'institution', 'department', 'designation', 'email_address']
            }
        };

        $scope.FetchSapHr = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = TempSapHrService.FetchAllWithPagination($scope.SearchQuery, function () {
                $scope.employees = [];
                $scope.SearchQuery.total_data = jsonResult.data.totalData;
                $scope.employees = jsonResult.data.list;
            });
        };

        $scope.chooseUser = function(data) {
            var jsonResult = TempSapHrService.FetchOneToUserModel({
                sapHrId: data.sap_hr_id
            }, function() {
                var user = jsonResult.data;

                $modalInstance.close(user);
            });
        };

        $scope.onSearch = function(sKeyword) {
            $scope.keyword = sKeyword;
            $scope.checkSearchValid();
            if ($scope.isValid)
                $scope.FetchSapHr();
        };

        $scope.onPageChanged = function(page){
            $scope.SearchQuery.page = page;
            $scope.FetchSapHr();
        };

        $scope.onSort = function(sortField){
            if ($scope.SearchQuery.sort_by == sortField)
                $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
            else
                $scope.SearchQuery.is_sort_asc = true;
            $scope.SearchQuery.sort_by = sortField;
            $scope.FetchSapHr();
        };

        $scope.checkSearchValid = function(){
            $scope.isValid = $scope.keyword.length > 0;
        };

        if (keywordData != null){
            $scope.keyword = keywordData;
            $scope.FetchSapHr();
        }
    });