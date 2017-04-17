angular.module('PKBL')
    .controller('ClusterPengusahaListCtrl',
     function ClusterPengusahaListCtrl($rootScope, $scope, $resource, $location, $modal, $timeout, ClusterPengusahaService,
         ToastMessageService, LoadingScreenService, SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);


         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/clusterPengusaha/clusterPengusaha-form/clusterPengusaha-form.html',
                 controller: 'ClusterPengusahaFormCtrl',
                 windowClass: 'modal-medium',
                 resolve: {
                     clusterPengusahaData: function () {
                         return data;
                     }
                 }
             }).result.then(function (result) {
                 var messageType = "", message = "";
                 if (result.IsSuccess) {
                     messageType = "success";
                     message = "Data Saved Succesfully";
                 } else {
                     messageType = "danger";
                     message = "Save Data Cluster Pengusaha failed. "+result.Message;
                 }
                 ToastMessageService.addAlerts(messageType, message);
                 $scope.Fetch();
             });
         };

         $scope.SearchQuery = {
             page: 1,
             row_per_page: 10,
             sort_by: 'nomor_register_cluster',
             is_sort_asc: true,
             total_data: 0,
             search: {
                 keyword: $scope.keyword,
                 fields: ['nomor_register_cluster']
             }
         };

         $scope.Rows = [10, 15, 20, 25, 50, 100];

         $scope.Fetch = function () {
             $scope.SearchQuery.search.keyword = $scope.keyword;
             var jsonResult = ClusterPengusahaService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.listClusterPengusaha = [];
                 var data_clusterPengusaha = jsonResult.data.list;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;
                 $scope.listClusterPengusaha = data_clusterPengusaha;
             });
         };
         
         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (clusterPengusahaData) {

             openModal(angular.copy(clusterPengusahaData));
         };

         $scope.onRowDelete = function (clusterPengusahaData) {
             var sel = confirm("Are you sure you want to delete the Cluster Pengusaha [" + clusterPengusahaData.nomor_register_cluster + "] ?");
             if (sel) {
                 var jsonResult = ClusterPengusahaService.Delete(clusterPengusahaData, function () {
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

         $scope.anggotaFilter = function (cluster) {
             return function(anggota) {
                 return anggota.pengusaha_id != cluster.ketua_id
                     && anggota.pengusaha_id != cluster.bendahara_id && anggota.pengusaha_id != cluster.sekretaris_id;
             }
         };

         $scope.onNomorPerjanjianClicked = function(clusterData){
            if(clusterData.is_show_anggota){
                clusterData.is_show_anggota = false;
            }else{
                clusterData.is_show_anggota = true;
            }
         };

         $scope.Fetch();
     });
