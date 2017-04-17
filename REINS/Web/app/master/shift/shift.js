angular.module('HITS')
    .controller('ShiftCtrl',
     function ShiftListCtrl($rootScope, $scope, $resource, $location, $modal, ShiftService, ToastMessageService,
         SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);
         if (!$scope.currentAcl['SM_MASTER_DATA_SHIFT_TIMING_VIEW']){
             $location.path('/unauthorized');
         }

         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/shift/shiftForm/shift-form.html',
                 controller: 'ShiftFormCtrl',
                 resolve: {
                     shiftData: function () {
                         return data;
                     }
                 }
             }).result.then(function (result) {
                 // ToastMessageService.addAlerts('Test');
                 $scope.Fetch();
             });
         };

         $scope.SearchQuery = {
             page: 1,
             row_per_page: 10,
             sort_by: 'start',
             is_sort_asc: false,
             total_data: 0,
             search: {
                 keyword: $scope.keyword,
                 fields: ['description']
             }
         };

         $scope.Fetch = function () {
             $scope.SearchQuery.search.keyword = $scope.keyword;
             var jsonResult = ShiftService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.shiftes = [];
                 var data_shiftes = jsonResult.data.list;
                 var i = 0;
                 $scope.shiftes = data_shiftes;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;


                 //$rootScope.hideLoading();
             });
         };

         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (shiftData) {

             openModal(angular.copy(shiftData));
         };

         $scope.onRowDelete = function (shiftData) {
             var sel = confirm("Are you sure you want to delete the Shift [" + shiftData.description + "] ?");
             if (sel) {
                 var jsonResult = ShiftService.Delete(shiftData, function () {
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
