angular.module('HITS')
    .controller('OperationDaysFormCtrl',
     function OperationDaysListCtrl($rootScope, $scope, $resource, $location, $modalInstance, DisciplineService, OperationDaysService, operationDaysData, ToastMessageService) {
         $scope.operationDays = operationDaysData;

         $scope.validate = {};
         $scope.validate.button = true;

         $scope.FetchAllDiscipline = function() {
             var result = DisciplineService.FetchAll(function () {
                 $scope.disciplines = [];
                 $scope.disciplines = result.data;
             });
         };
         $scope.FetchAllDiscipline();

         if ($scope.operationDays.year) {
             $scope.validate.year = false;
         }
         if ($scope.operationDays.month) {
             $scope.validate.month = false;
         }
         if ($scope.operationDays.days) {
             $scope.validate.days = false;
         }

         $scope.isValid = function () {
             $scope.validate.year = !$scope.operationDays.year;
             $scope.validate.month = !$scope.operationDays.month;
             $scope.validate.days = !$scope.operationDays.days;

             return (!$scope.validate.year && !$scope.validate.month && !$scope.validate.days);
         };

         if (!$scope.operationDays.operation_days_id) {
             $scope.operationDays.operation_days_id = 0;
         }
         $scope.onSave = function (operationDaysData) {
             
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = OperationDaysService.Save(operationDaysData, function () {
                     if (result.data) {
                         ToastMessageService.addAlerts("success", "Data Saved Succesfully");
                         $modalInstance.close();
                     } else {
                         $scope.validate.button = true;
                         ToastMessageService.addAlerts("danger", "There is a record found for the year and month entered. Please update the existing record");
                     }
                 });
             }
         };

         var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         $scope.months = [];
         for (var i in month) {
             var m = month[i];
             var key = +i + 1;
             $scope.months.push({key : key, name : m})
         }

         $scope.years = [];
         var currentYear = new Date().getFullYear();
         var maxYear = 2030;
         while (maxYear < currentYear){
             maxYear += 15;
         }

         for (var i = 2015; i <= maxYear; i++) {
             $scope.years.push(i);
         }

         $scope.onChangeDiscipline = function () {
             $scope.operationDays.Discipline = {};
             if ($scope.operationDays.discipline_id) {
                 angular.forEach($scope.disciplines, function (pDays, key) {
                     if (pDays.discipline_id == $scope.operationDays.discipline_id) {
                         $scope.operationDays.Discipline = pDays;
                     }
                 });
             }
         };

     });
