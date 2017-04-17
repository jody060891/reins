angular.module('PKBL')
    .controller('NomorPerkiraanFormCtrl',
     function NomorPerkiraanFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, nomorPerkiraanData,
            NomorPerkiraanService) {
         $scope.nomorPerkiraan = nomorPerkiraanData;
         $scope.onSave = function (nomorPerkiraanData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = NomorPerkiraanService.Save($scope.nomorPerkiraan, function () {
                     $modalInstance.close(result.data);

                 });
             }
         };

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.nomorPerkiraan.nomor_perkiraan) {
             $scope.validate.nomor_perkiraan = false;
         }
         if ($scope.nomorPerkiraan.nama_perkiraan) {
             $scope.validate.nama_perkiraan = false;
         }

         $scope.isValid = function () {
             if ($scope.nomorPerkiraan.nomor_perkiraan) {
                 $scope.validate.nomor_perkiraan = false;
             } else {
                 $scope.validate.nomor_perkiraan = true;
             }
             if ($scope.nomorPerkiraan.nama_perkiraan) {
                 $scope.validate.nama_perkiraan = false;
             } else {
                 $scope.validate.nama_perkiraan = true;
             }


             if (!$scope.validate.nama_perkiraan && !$scope.validate.nomor_perkiraan) {
                 return true;
             } else {
                 return false;
             }
         }


     });