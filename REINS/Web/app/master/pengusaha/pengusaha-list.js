angular.module('PKBL')
    .controller('PengusahaListCtrl',
     function PengusahaListCtrl($rootScope, $scope, $resource, $location, $modal, $timeout, PengusahaService,
         ToastMessageService, LoadingScreenService, SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);


         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/pengusaha/pengusaha-form/pengusaha-form.html',
                 controller: 'PengusahaFormCtrl',
                 resolve: {
                     pengusahaData: function () {
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
                     message = "Save Data Pengusaha failed. "+result.Message;
                 }
                 ToastMessageService.addAlerts(messageType, message);
                 $scope.Fetch();
             });
         };

         $scope.SearchQuery = {
             page: 1,
             row_per_page: 10,
             sort_by: 'nomor_register_pengusaha',
             is_sort_asc: true,
             total_data: 0,
             search: {
                 keyword: $scope.keyword,
                 fields: ['nomor_register_pengusaha']
             }
         };

         $scope.Rows = [10, 15, 20, 25, 50, 100];

         $scope.Fetch = function () {
             $scope.SearchQuery.search.keyword = $scope.keyword;
             var jsonResult = PengusahaService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.listPengusaha = [];
                 var data_pengusaha = jsonResult.data.list;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;
                 $scope.listPengusaha = data_pengusaha;
             });
         };
         
         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (pengusahaData) {

             openModal(angular.copy(pengusahaData));
         };

         $scope.onRowDelete = function (pengusahaData) {
             var sel = confirm("Are you sure you want to delete the Pengusaha [" + pengusahaData.nomor_register_pengusaha + "] ?");
             if (sel) {
                 var jsonResult = PengusahaService.Delete(pengusahaData, function () {
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

         $scope.Fetch();
     });
