angular.module('PKBL')
    .controller('SearchNomorRegisterCtrl',
     function SearchNomorRegisterCtrl($rootScope, $scope, $resource, $location, $modalInstance,
            ClusterPengusahaService, PengusahaService, keywordData, tipePinjamanData) {
         $scope.keyword = {};
         $scope.keyword.keywordCluster = angular.copy(keywordData);
         $scope.keyword.keywordPengusaha = angular.copy(keywordData);
         $scope.tipePinjamanData = angular.copy(tipePinjamanData);


         $scope.SearchQueryPengusaha = {
             page: 1,
             row_per_page: 10,
             sort_by: 'nomor_register_pengusaha',
             is_sort_asc: true,
             total_data: 0,
             search: {
                 keyword: $scope.keyword.keywordPengusaha,
                 fields: ['nomor_register_pengusaha', 'nomor_perjanjian']
             }
         };

         $scope.onSearchPengusaha = function () {
             $scope.FetchAllPengusaha();
         };

         $scope.onPageChangedPengusaha = function (page) {
             $scope.SearchQueryPengusaha.page = page;
             //console.log($scope.SearchQuery);
             $scope.FetchAllPengusaha();
         };

         $scope.onSortPengusaha = function (sortField) {
             if ($scope.SearchQueryPengusaha.sort_by == sortField)
                 $scope.SearchQueryPengusaha.is_sort_asc = !$scope.SearchQueryPengusaha.is_sort_asc;
             else
                 $scope.SearchQueryPengusaha.is_sort_asc = true;
             $scope.SearchQueryPengusaha.sort_by = sortField;
             $scope.FetchAllPengusaha();
         };

         $scope.onKeyPressPengusaha = function ($event) {
             if ($event.keyCode === 13) {
                 $scope.onSearchPengusaha();
             }
         };

         $scope.SearchQueryCluster = {
             page: 1,
             row_per_page: 10,
             sort_by: 'nomor_register_cluster',
             is_sort_asc: true,
             total_data: 0,
             search: {
                 keyword: $scope.keyword.keywordCluster,
                 fields: ['nomor_register_cluster', 'nomor_perjanjian']
             }
         };

         $scope.onSearchCluster = function () {
             $scope.FetchAllCluster();
         };

         $scope.onPageChangedCluster = function (page) {
             $scope.SearchQueryCluster.page = page;
             //console.log($scope.SearchQuery);
             $scope.FetchAllCluster();
         };

         $scope.onSortCluster = function (sortField) {
             if ($scope.SearchQueryCluster.sort_by == sortField)
                 $scope.SearchQueryCluster.is_sort_asc = !$scope.SearchQueryCluster.is_sort_asc;
             else
                 $scope.SearchQueryCluster.is_sort_asc = true;
             $scope.SearchQueryCluster.sort_by = sortField;
             $scope.FetchAllCluster();
         };

         $scope.onKeyPressCluster= function ($event) {
             if ($event.keyCode === 13) {
                 $scope.onSearchCluster();
             }
         };

         $scope.FetchAllPengusaha = function(){
             $scope.SearchQueryPengusaha.search.keyword = $scope.keyword.keywordPengusaha;
             var jsonResult = PengusahaService.FetchAllWithPagination($scope.SearchQueryPengusaha, function(){
                 var data_pengusaha = jsonResult.data.list;
                 $scope.listPengusaha = [];
                 $scope.listPengusaha = data_pengusaha;
                 $scope.SearchQueryPengusaha.total_data = jsonResult.data.totalData;
             });
         }

         $scope.FetchAllCluster = function(){
             $scope.SearchQueryCluster.search.keyword = $scope.keyword.keywordCluster;
             var jsonResult = ClusterPengusahaService.FetchAllWithPagination($scope.SearchQueryCluster, function(){
                 var data_clusterPengusaha = jsonResult.data.list;
                 $scope.listClusterPengusaha = [];
                 $scope.listClusterPengusaha = data_clusterPengusaha;
                 $scope.SearchQueryCluster.total_data = jsonResult.data.totalData;
             });
         };

         $scope.onSelect = function(result){
             $modalInstance.close(result);
         };

         if(tipePinjamanData == "CLUSTER"){
             $scope.FetchAllCluster();
         }else if(tipePinjamanData == "PERSONAL"){
             $scope.FetchAllPengusaha();
         }


     });