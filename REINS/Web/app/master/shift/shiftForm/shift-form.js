angular.module('HITS')
    .controller('ShiftFormCtrl',
     function ShiftListCtrl($rootScope, $scope, $resource, $location, $modalInstance, ShiftService, shiftData) {
         $scope.shift = shiftData;

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.shift.description) {
             $scope.validate.description = false;
         }
         if ($scope.shift.start) {
             $scope.validate.start = false;
         }
         if ($scope.shift.end) {
             $scope.validate.end = false;
         }

         $scope.isValid = function () {
             if ($scope.shift.description) {
                 $scope.validate.description = false;
             } else {
                 $scope.validate.description = true;
             }
             if ($scope.shift.start) {
                 $scope.validate.start = false;
             } else {
                 $scope.validate.start = true;
             }
             if ($scope.shift.end) {
                 $scope.validate.end = false;
             } else {
                 $scope.validate.end = true;
             }

             if (!$scope.validate.description && !$scope.validate.start && !$scope.validate.end) {
                 return true;
             } else {
                 return false;
             }
         }

         $scope.onSave = function (shiftData) {
             if ($scope.isValid()) {
                 
                 if (!shiftData.description || !shiftData.start || !shiftData.end) return;

                 try {
                     shiftData.start.setFullYear(1990);
                     shiftData.start.setMonth(0);
                     shiftData.start.setDate(1);

                     shiftData.end.setFullYear(1990);
                     shiftData.end.setMonth(0);
                     shiftData.end.setDate(1);
                 } catch (ex) {
                 }
                 $scope.validate.button = false;
                 var result = ShiftService.Save(shiftData, function () {
                     $modalInstance.close();

                 });
             }
         };

     });
