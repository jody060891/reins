angular.module('PKBL')
    .controller('JenisUsahaFormCtrl',
     function JenisUsahaFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, jenisUsahaData,
            JenisUsahaService) {
         $scope.jenisUsaha = angular.copy(jenisUsahaData);
         $scope.onSave = function (jenisUsaha) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = JenisUsahaService.Save($scope.jenisUsaha, function () {
                     $modalInstance.close(result.data);

                 });
             }
         };

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.jenisUsaha.kode) {
             $scope.validate.kode = false;
         }
         if ($scope.jenisUsaha.nama_jenis_usaha) {
             $scope.validate.nama_jenis_usaha = false;
         }

         $scope.isValid = function () {
             if ($scope.jenisUsaha.kode) {
                 $scope.validate.kode = false;
             } else {
                 $scope.validate.kode = true;
             }
             if ($scope.jenisUsaha.nama_jenis_usaha) {
                 $scope.validate.nama_jenis_usaha = false;
             } else {
                 $scope.validate.nama_jenis_usaha = true;
             }


             if (!$scope.validate.nama_jenis_usaha && !$scope.validate.kode) {
                 return true;
             } else {
                 return false;
             }
         }


     });