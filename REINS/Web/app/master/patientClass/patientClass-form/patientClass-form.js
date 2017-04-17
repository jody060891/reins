angular.module('HITS')
    .controller('PatientClassFormCtrl',
     function PatientClassListCtrl($rootScope, $scope, $resource, $location, $modalInstance, PatientClassService, patientClassData) {
         $scope.patientClass = patientClassData;

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.patientClass.patient_class_code) {
             $scope.validate.patient_class_code = false;
         }
         if ($scope.patientClass.patient_class_name) {
             $scope.validate.patient_class_name = false;
         }

         $scope.isValid = function () {
             if ($scope.patientClass.patient_class_code) {
                 $scope.validate.patient_class_code = false;
             } else {
                 $scope.validate.patient_class_code = true;
             }
             if ($scope.patientClass.patient_class_name) {
                 $scope.validate.patient_class_name = false;
             } else {
                 $scope.validate.patient_class_name = true;
             }


             if (!$scope.validate.patient_class_code && !$scope.validate.patient_class_name) {
                 return true;
             } else {
                 return false;
             }
         }

         $scope.onSave = function (patientClassData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = PatientClassService.Save(patientClassData, function () {
                     $modalInstance.close();

                 });
             }
         };

     });
