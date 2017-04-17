angular.module('HITS')
    .controller('AEAttendanceCtrl',
     function PatientDaysListCtrl($rootScope, $scope, $resource, $location, $modal, AEAttendanceService, ToastMessageService,
         SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);
         if (!$scope.currentAcl['SM_MASTER_DATA_AE_ATTENDANCE_VIEW']){
             $location.path('/unauthorized');
         }



         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/aeAttendance/aeAttendanceForm/ae-attendance-form.html',
                 controller: 'AEAttendanceFormCtrl',
                 resolve: {
                     aeAttendanceData: function () {
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
                 fields: ['year', 'total']
             }
         };
         var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         $scope.months = {};
         for (var i in month) {
             var m = month[i];
             var key = +i + 1;
             $scope.months[key] = m;
         }

         $scope.Fetch = function () {
             $scope.SearchQuery.search.keyword = $scope.keyword;
             var jsonResult = AEAttendanceService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.aeAttendances = [];
                 var data_aeAttendances = jsonResult.data.list;
                 var i = 0;
                 $scope.aeAttendances = data_aeAttendances;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;
                 
                 //$rootScope.hideLoading();
             });
         };

         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (aeAttendancesData) {

             openModal(angular.copy(aeAttendancesData));
         };

         $scope.onRowDelete = function (aeAttendancesData) {
             var sel = confirm("Are you sure you want to delete the A&E Attendance [" + aeAttendancesData.year + " " + aeAttendancesData.month + "] ?");
             if (sel) {
                 var jsonResult = AEAttendanceService.Delete(aeAttendancesData, function () {
                     $scope.Fetch();
                 });
             }
         };


         $scope.onSearch = function () {
             $scope.SearchQuery.sort_by = 'default';
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
