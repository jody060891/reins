angular.module('PKBL')
    .controller('DashboardCtrl', function ($scope, $http, $location, OccupationService) {
        $scope.initCount = 0;
        $scope.generalOccupation = {};
        $scope.keyword = {};
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'Occup',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keyword,
                fields: ['Occup', 'OccupName']
            }
        };

        var today = new Date();

        $scope.onSearch = function () {
            $scope.FetchOccupationGroupWithPagination();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
            //console.log($scope.SearchQuery);
            $scope.FetchOccupationGroupWithPagination();
        };

        $scope.onSort = function (sortField) {
            if ($scope.SearchQuery.sort_by == sortField)
                $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
            else
                $scope.SearchQuery.is_sort_asc = true;
            $scope.SearchQuery.sort_by = sortField;
            $scope.FetchOccupationGroupWithPagination();
        };

        $scope.onKeyPress = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearch();
            }
            //$scope.onSearch();
        };

        $scope.FetchOccupationByYear = function(){
            var jsonResult = OccupationService.FetchOccupationByYear(
                {
                    year: today.getFullYear()-1
                }, function(){
                    $scope.generalOccupation = jsonResult.data;
                    $scope.generalOccupation.ratioPremiPrev = Math.round(($scope.generalOccupation.premi*100/$scope.generalOccupation.premi_prev)*100)/100;
                    $scope.generalOccupation.ratioClaimPrev = Math.round(($scope.generalOccupation.claim*100/$scope.generalOccupation.claim_prev)*100)/100;
                    $scope.generalOccupation.ratioLRPrev = Math.round(($scope.generalOccupation.loss_ratio*100/$scope.generalOccupation.loss_ratio_prev)*100)/100;
                });
        };


        $scope.FetchOccupationByYear();

        $scope.FetchOccupationGroupWithPagination = function(){
            $scope.SearchQuery.search.keyword = $scope.keyword.keyword;
            var jsonResult = OccupationService.FetchOccupationGroupWithPagination(
                {
                    searchQuery: $scope.SearchQuery
                }, function(){
                    $scope.listOccupation = [];
                    $scope.listOccupation = jsonResult.data.list;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                }
            );
        };

        $scope.FetchOccupationGroupWithPagination();

        $scope.onViewLrYearOc = function(occupation){
            $location.path("/client_portal/lr_year_oc").search({occup: occupation.Occup});
        };
    });