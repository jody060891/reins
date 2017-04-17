angular.module('HITS')
    .controller('AEAttendanceFormCtrl',
     function PatientDaysListCtrl($rootScope, $scope, $resource, $location, $modalInstance, AEAttendanceService, ToastMessageService, aeAttendanceData) {
         $scope.aeAttendance = aeAttendanceData;
         if (!$scope.aeAttendance.ae_attendance_id) {
             $scope.aeAttendance.ae_attendance_id = 0;
         }

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.aeAttendance.year) {
             $scope.validate.year = false;
         }
         if ($scope.aeAttendance.month) {
             $scope.validate.month = false;
         }
         if ($scope.aeAttendance.total) {
             $scope.validate.total = false;
         }

         $scope.isValid = function () {
             if ($scope.aeAttendance.year) {
                 $scope.validate.year = false;
             } else {
                 $scope.validate.year = true;
             }
             if ($scope.aeAttendance.month) {
                 $scope.validate.month = false;
             } else {
                 $scope.validate.month = true;
             }
             if ($scope.aeAttendance.total) {
                 $scope.validate.total = false;
             } else {
                 $scope.validate.total = true;
             }



             if (!$scope.validate.year && !$scope.validate.month && !$scope.validate.total) {
                 return true;
             } else {
                 return false;
             }
         }

         $scope.onSave = function (aeAttendanceData) {
             //if (!aeAttendanceData.year || !aeAttendanceData.month) return;
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = AEAttendanceService.Save(aeAttendanceData, function () {
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
