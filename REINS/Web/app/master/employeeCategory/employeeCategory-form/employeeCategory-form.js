angular.module('HITS')
    .controller('EmployeeCategoryFormCtrl',
     function EmployeeCategoryListCtrl($rootScope, $scope, $resource, $location, $modalInstance, EmployeeCategoryService, employeeCategoryData) {
         $scope.employeeCategory = employeeCategoryData;

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.employeeCategory.employee_category_description) {
             $scope.validate.employee_category_description = false;
         }
         if ($scope.employeeCategory.employee_category_code) {
             $scope.validate.employee_category_code = false;
         }

         $scope.isValid = function () {
             if ($scope.employeeCategory.employee_category_description) {
                 $scope.validate.employee_category_description = false;
             } else {
                 $scope.validate.employee_category_description = true;
             }
             if ($scope.employeeCategory.employee_category_code) {
                 $scope.validate.employee_category_code = false;
             } else {
                 $scope.validate.employee_category_code = true;
             }


             if (!$scope.validate.employee_category_description && !$scope.validate.employee_category_code) {
                 return true;
             } else {
                 return false;
             }
         }

         $scope.onSave = function (employeeCategoryData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = EmployeeCategoryService.Save(employeeCategoryData, function () {
                     $modalInstance.close();

                 });
             }
         };

     });
