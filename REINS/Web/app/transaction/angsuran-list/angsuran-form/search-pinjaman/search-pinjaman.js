angular.module('PKBL')
    .controller('SearchPinjamanCtrl',
     function SearchPinjamanCtrl($rootScope, $scope, $resource, $location, $modalInstance,
            PinjamanService, keywordData) {
         $scope.keyword = {};
         $scope.keyword.keyword = angular.copy(keywordData);


         $scope.SearchQuery = {
             page: 1,
             row_per_page: 10,
             sort_by: 'nomor_register',
             is_sort_asc: true,
             total_data: 0,
             search: {
                 keyword: $scope.keyword.keyword,
                 fields: ['nomor_register', 'nomor_perjanjian']
             }
         };

         $scope.onSearch = function () {
             $scope.FetchAll();
         };

         $scope.onPageChanged = function (page) {
             $scope.SearchQuery.page = page;
             //console.log($scope.SearchQuery);
             $scope.FetchAll();
         };

         $scope.onSort = function (sortField) {
             if ($scope.SearchQuery.sort_by == sortField)
                 $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
             else
                 $scope.SearchQuery.is_sort_asc = true;
             $scope.SearchQuery.sort_by = sortField;
             $scope.FetchAll();
         };

         $scope.onKeyPress = function ($event) {
             if ($event.keyCode === 13) {
                 $scope.onSearch();
             }
         };

         $scope.FetchAll = function(){
             $scope.SearchQuery.search.keyword = $scope.keyword.keyword;
             var jsonResult = PinjamanService.FetchAllWithPagination($scope.SearchQuery, function(){
                 var data_pinjaman = jsonResult.data.list;
                 $scope.listPinjaman = [];
                 $scope.listPinjaman= data_pinjaman;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;
             });
         };

         $scope.onSelect = function(result){
             $modalInstance.close(result);
         };

         $scope.FetchAll();

     });