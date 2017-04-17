angular.module('HITS')
    .controller('PatientClassListCtrl',
     function PatientClassListCtrl($rootScope, $scope, $resource, $location, $modal, PatientClassService,
         ToastMessageService, SessionService, UserAclSessionData) {
         SessionService.setAclSession(UserAclSessionData);
         SessionService.setAcltoScope($scope);
         if (!$scope.currentAcl['SM_MASTER_DATA_PATIENT_CLASS_VIEW']){
             $location.path('/unauthorized');
         }

         var openModal = function (data) {
             $modal.open({
                 templateUrl: 'app/master/patientClass/patientClass-form/patientClass-form.html',
                 controller: 'PatientClassFormCtrl',
                 resolve: {
                     patientClassData: function () {
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
             sort_by: 'patient_class_name',
             is_sort_asc: true,
             total_data: 0,
             search: {
                 keyword: $scope.keyword,
                 fields: ['patient_class_name', 'patient_class_code', 'short_description']
             }
         };

         $scope.Fetch = function () {
             $scope.SearchQuery.search.keyword = $scope.keyword;
             var jsonResult = PatientClassService.FetchAllWithPagination($scope.SearchQuery, function () {
                 $scope.patientClasses = [];
                 var data_patientClasses = jsonResult.data.list;
                 var i = 0;
                 $scope.patientClasses = data_patientClasses;
                 $scope.SearchQuery.total_data = jsonResult.data.totalData;


                 //$rootScope.hideLoading();
             });
         };

         $scope.onCreateNew = function () {

             openModal({});
         };

         $scope.onRowEdit = function (patientClassData) {

             openModal(angular.copy(patientClassData));
         };

         $scope.onRowDelete = function (patientClassData) {
             var sel = confirm("Are you sure you want to delete the Patient Class [" + patientClassData.patient_class_name + "] ?");
             if (sel) {
                 var jsonResult = PatientClassService.Delete(patientClassData, function () {
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
