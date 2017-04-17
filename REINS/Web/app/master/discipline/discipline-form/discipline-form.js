angular.module('HITS')
    .controller('DisciplineFormCtrl',
     function DisciplineListCtrl($rootScope, $scope, $resource, $location, $modalInstance, DisciplineService, disciplineData) {
         $scope.discipline = disciplineData;

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.discipline.discipline_code) {
             $scope.validate.discipline_code = false;
         }
         if ($scope.discipline.discipline_name) {
             $scope.validate.discipline_name = false;
         }

         $scope.isValid = function () {
             if ($scope.discipline.discipline_code) {
                 $scope.validate.discipline_code = false;
             } else {
                 $scope.validate.discipline_code = true;
             }
             if ($scope.discipline.discipline_name) {
                 $scope.validate.discipline_name = false;
             } else {
                 $scope.validate.discipline_name = true;
             }


             if (!$scope.validate.discipline_code && !$scope.validate.discipline_name) {
                 return true;
             } else {
                 return false;
             }
         }

         $scope.onSave = function (disciplineData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = DisciplineService.Save(disciplineData, function () {
                     $modalInstance.close();

                 });
             }
         };

     });