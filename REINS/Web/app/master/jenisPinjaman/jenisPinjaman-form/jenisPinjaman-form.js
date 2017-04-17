angular.module('PKBL')
    .controller('JenisPinjamanFormCtrl',
     function JenisPinjamanFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, jenisPinjamanData,
            JenisPinjamanService) {
         $scope.jenisPinjaman = angular.copy(jenisPinjamanData);
         $scope.onSave = function (jenisPinjaman) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = JenisPinjamanService.Save($scope.jenisPinjaman, function () {
                     $modalInstance.close(result.data);

                 });
             }
         };

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.jenisPinjaman.kode) {
             $scope.validate.kode = false;
         }
         if ($scope.jenisPinjaman.jenis_pinjaman) {
             $scope.validate.jenis_pinjaman = false;
         }

         $scope.isValid = function () {
             if ($scope.jenisPinjaman.kode) {
                 $scope.validate.kode = false;
             } else {
                 $scope.validate.kode = true;
             }
             if ($scope.jenisPinjaman.jenis_pinjaman) {
                 $scope.validate.jenis_pinjaman = false;
             } else {
                 $scope.validate.jenis_pinjaman = true;
             }


             if (!$scope.validate.jenis_pinjaman && !$scope.validate.kode) {
                 return true;
             } else {
                 return false;
             }
         }


     });