angular.module('PKBL')
    .controller('RiskPolisCtrl', function ($scope, $http, $location, RiskPolisService) {
        $scope.initCount = 0;
        $scope.generalOccupation = {};
        $scope.keyword = {};
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'list_range',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keyword,
                fields: ['list_range', 'band_from']
            }
        };
        $scope.keyword.range = 1;
        $scope.listRange = [
            {list_range: 1, range: 25},
            {list_range: 2, range: 50},
            {list_range: 3, range: 75},
            {list_range: 4, range: 100}
            ];

        var today = new Date();

        $scope.onSearch = function () {
            $scope.SearchQuery.page = 1;
            if($scope.keyword.tahunFrom != null && $scope.keyword.tahunTo != null){
                if($scope.keyword.tahunFrom <= $scope.keyword.tahunTo){
                    $scope.FetchAllWithPagination();
                }else{
                    alert("Tahun From harus lebih kecil dari Tahun To");
                }
            }else{
                $scope.FetchAllWithPagination();
            }

        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
            //console.log($scope.SearchQuery);
            $scope.FetchAllWithPagination();
        };

        $scope.onSort = function (sortField) {
            if ($scope.SearchQuery.sort_by == sortField)
                $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
            else
                $scope.SearchQuery.is_sort_asc = true;
            $scope.SearchQuery.sort_by = sortField;
            $scope.FetchAllWithPagination();
        };

        $scope.onKeyPress = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearch();
            }
            //$scope.onSearch();
        };



        $scope.FetchAllWithPagination = function(){
            $scope.SearchQuery.search.keyword = $scope.keyword.keyword;
            var jsonResult = RiskPolisService.FetchAllWithPagination(
                {
                    searchQuery: $scope.SearchQuery,
                    riskPolisSearch: $scope.keyword
                }, function(){
                    $scope.listRiskPolis = [];
                    $scope.listRiskPolis = jsonResult.data.list;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                }
            );
        };

        $scope.FetchAllWithPagination();

        $scope.onViewLrYearOc = function(occupation){
            $location.path("/client_portal/lr_year_oc").search({occup: occupation.occup});
        };
    });