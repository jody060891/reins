angular.module('HITS')
    .controller('DesignationGroupFormCtrl',
   function DesignationGroupListCtrl($rootScope, $scope, $resource, $location, $modalInstance, DesignationGroupService, designationGroupData) {
       $scope.designationGroup = designationGroupData;

       $scope.validate = {};
       $scope.validate.button = true;

       if ($scope.designationGroup.designation_group_name) {
           $scope.validate.designation_group_name = false;
       }

       $scope.isValid = function () {
           if ($scope.designationGroup.designation_group_name) {
               $scope.validate.designation_group_name = false;
           } else {
               $scope.validate.designation_group_name = true;
           }


           if (!$scope.validate.designation_group_name) {
               return true;
           } else {
               return false;
           }
       }
       $scope.onSave = function (designationGroupData) {
           if ($scope.isValid()) {
               $scope.validate.button = false;
               var result = DesignationGroupService.Save(designationGroupData, function () {
                   $modalInstance.close();

               });
           }
       };
   });