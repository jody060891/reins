angular.module('HITS')
    .controller('EmployeeCategoryFormCtrl',
     function EmployeeCategoryListCtrl($rootScope, $scope, $resource, $location, $modalInstance, EmployeeCategoryService, employeeCategoryData) {
         $scope.employeeCategory = employeeCategoryData;
         $scope.validate = {};
         $scope.validate.button = true;
         $scope.onSave = function (employeeCategoryData) {
             $scope.validate.button = false;
             var result = EmployeeCategoryService.Save(employeeCategoryData, function () {
                 $modalInstance.close();

             });
         };

     });
