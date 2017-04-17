angular.module('HITS')
    .controller('AdmissionDaysCtrl',
     function AdmissionDaysListCtrl($rootScope, $scope, $resource, $location, $modal, AdmissionDaysService, ToastMessageService,
         SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);
         if (!$scope.currentAcl['SM_MASTER_DATA_ADMISSION_DAYS_VIEW']){
             $location.path('/unauthorized');
         }



         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/admissionDays/admissionDaysForm/admission-days-form.html',
                 controller: 'AdmissionDaysFormCtrl',
                 resolve: {
                     admissionDaysData: function () {
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
                 fields: ['year','month','Discipline.discipline_name']
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
             var jsonResult = AdmissionDaysService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.admissionDays = [];
                 var data_admissionDays = jsonResult.data.list;
                 var i = 0;
                 $scope.admissionDays = data_admissionDays;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;

                 //$rootScope.hideLoading();
             });
         };

         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (admissionDaysData) {
             openModal(angular.copy(admissionDaysData));
         };

         $scope.onRowDelete = function (aeAttendancesData) {
             var sel = confirm("Are you sure you want to delete the Admission Days [" + aeAttendancesData.year + " " + aeAttendancesData.month + "] ?");
             if (sel) {
                 var jsonResult = AdmissionDaysService.Delete(aeAttendancesData, function () {
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

         $scope.onKeyPress = function ($event) {
             if ($event.keyCode === 13) {
                 $scope.onSearch();
             }
         };
         $scope.Fetch();
     });
