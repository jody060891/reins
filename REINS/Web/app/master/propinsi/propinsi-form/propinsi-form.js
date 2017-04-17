angular.module('PKBL')
    .controller('PropinsiFormCtrl',
     function PropinsiFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, propinsiData,
            PropinsiService) {
         $scope.propinsi = angular.copy(propinsiData);
         $scope.onSave = function (propinsiData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = PropinsiService.Save($scope.propinsi, function () {
                     $modalInstance.close(result.data);

                 });
             }
         };

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.propinsi.kode_propinsi) {
             $scope.validate.kode_propinsi = false;
         }
         if ($scope.propinsi.nama_propinsi) {
             $scope.validate.nama_propinsi = false;
         }

         $scope.isValid = function () {
             if ($scope.propinsi.kode_propinsi) {
                 $scope.validate.kode_propinsi = false;
             } else {
                 $scope.validate.kode_propinsi = true;
             }
             if ($scope.propinsi.nama_propinsi) {
                 $scope.validate.nama_propinsi = false;
             } else {
                 $scope.validate.nama_propinsi = true;
             }


             if (!$scope.validate.nama_propinsi && !$scope.validate.kode_propinsi) {
                 return true;
             } else {
                 return false;
             }
         }


     });