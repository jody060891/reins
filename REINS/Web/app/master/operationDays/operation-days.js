angular.module('HITS')
    .controller('OperationDaysCtrl',
     function OperationDaysListCtrl($rootScope, $scope, $resource, $location, $modal, OperationDaysService,
         ToastMessageService, SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);
         if (!$scope.currentAcl['SM_MASTER_DATA_PATIENT_DAYS_VIEW']){
             $location.path('/unauthorized');
         }
         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/operationDays/operationDaysForm/operation-days-form.html',
                 controller: 'OperationDaysFormCtrl',
                 resolve: {
                     operationDaysData: function () {
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
             sort_by: 'default',
             is_sort_asc: false,
             total_data: 0,
             search: {
                 keyword: $scope.keyword,
                 fields: ['year', 'month', 'Discipline.discipline_name']
             }
         };

         $scope.Fetch = function () {
             $scope.SearchQuery.search.keyword = $scope.keyword;
             var jsonResult = OperationDaysService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.operationDayses = [];
                 var data_operationDayses = jsonResult.data.list;
                 var i = 0;
                 $scope.operationDayses = data_operationDayses;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;


                 //$rootScope.hideLoading();
             });
         };

         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (operationDaysData) {

             openModal(angular.copy(operationDaysData));
         };

         $scope.onRowDelete = function (operationDaysData) {
             var sel = confirm("Are you sure you want to delete the Operation Days [" + operationDaysData.year + " " + operationDaysData.month + "] ?");
             if (sel) {
                 var jsonResult = OperationDaysService.Delete(operationDaysData, function () {
                     $scope.Fetch();
                 });
             }
         };


         $scope.onSearch = function () {
             $scope.SearchQuery.sort_by = "default";
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

         var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         $scope.months = {};
         for (var i in month) {
             var m = month[i];
             var key = +i + 1;
             $scope.months[key] = m;
         }

         $scope.onKeyPress = function ($event) {
             if ($event.keyCode === 13) {
                 $scope.onSearch();
             }
         };

         $scope.Fetch();
     });
