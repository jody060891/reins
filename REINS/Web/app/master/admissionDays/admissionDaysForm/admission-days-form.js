angular.module('HITS')
    .controller('AdmissionDaysFormCtrl',
     function AdmissionDaysListCtrl($rootScope, $scope, $resource, $location, $modalInstance, DisciplineService, AdmissionDaysService, ToastMessageService, admissionDaysData) {
         $scope.admissionDays = admissionDaysData;
         if (!$scope.admissionDays.admission_days_id) {
             $scope.admissionDays.admission_days_id = 0;
         }

         $scope.FetchAllDiscipline = function() {
             var result = DisciplineService.FetchAll(function () {
                 $scope.disciplines = [];
                 $scope.disciplines = result.data;
             });
         };
         $scope.FetchAllDiscipline();
         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.admissionDays.year) {
             $scope.validate.year = false;
         }
         if ($scope.admissionDays.month) {
             $scope.validate.month = false;
         }
         if ($scope.admissionDays.total) {
             $scope.validate.total = false;
         }
         if ($scope.admissionDays.discipline_id) {
             $scope.validate.discipline_id = false;
         }

         $scope.isValid = function () {
             if ($scope.admissionDays.year) {
                 $scope.validate.year = false;
             } else {
                 $scope.validate.year = true;
             }
             if ($scope.admissionDays.month) {
                 $scope.validate.month = false;
             } else {
                 $scope.validate.month = true;
             }
             if ($scope.admissionDays.total) {
                 $scope.validate.total = false;
             } else {
                 $scope.validate.total = true;
             }
             if ($scope.admissionDays.discipline_id) {
                 $scope.validate.discipline_id = false;
             } else {
                 $scope.validate.discipline_id = true;
             }


             if (!$scope.validate.year && !$scope.validate.month && !$scope.validate.total && !$scope.validate.discipline_id) {
                 return true;
             } else {
                 return false;
             }
         };

         $scope.onChangeDiscipline = function () {
             $scope.admissionDays.Discipline = {};
             if ($scope.admissionDays.discipline_id) {
                 angular.forEach($scope.disciplines, function (discipline, key) {
                     if (discipline.discipline_id == $scope.admissionDays.discipline_id) {
                         $scope.admissionDays.Discipline = discipline;
                     }
                 });
             }
         };

         $scope.onSave = function (admissionDaysData) {
             //if (!aeAttendanceData.year || !aeAttendanceData.month) return;
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = AdmissionDaysService.Save(admissionDaysData, function () {
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
             $scope.months.push({ key: key, name: m })
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

     });
