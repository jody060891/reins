angular.module('HITS')
    .controller('DesignationFormCtrl',
     function DesignationListCtrl($rootScope, $scope, $resource, $location, $modalInstance, DesignationService,EmployeeCategoryService,DesignationGroupService, designationData) {
         $scope.designation = designationData;
         $scope.onSave = function (designationData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = DesignationService.Save($scope.designation, function () {
                     $modalInstance.close(true);

                 });
             }
         };

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.designation.designation_description) {
             $scope.validate.designation_description = false;
         }

         $scope.isValid = function () {
             if ($scope.designation.designation_description) {
                 $scope.validate.designation_description = false;
             } else {
                 $scope.validate.designation_description = true;
             }


             if (!$scope.validate.designation_description) {
                 return true;
             } else {
                 return false;
             }
         }

         var ec = EmployeeCategoryService.FetchAll(function () {
             $scope.employeeCategories = ec.data;
         });
         var dg = DesignationGroupService.FetchAll(function () {
             $scope.designationGroups = dg.data;
         });

     });