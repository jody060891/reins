angular.module('PKBL')
    .controller('WilayahFormCtrl',
     function WilayahFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, wilayahData,
            WilayahService, PropinsiService) {
         $scope.wilayah = angular.copy(wilayahData);
         $scope.onSave = function (wilayahData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = WilayahService.Save($scope.wilayah, function () {
                     $modalInstance.close(result.data);

                 });
             }
         };

         $scope.FetchPropinsi = function(){
             var jsonResult = PropinsiService.FetchAll(function(){
                 var data_propinsi = jsonResult.data;
                 $scope.listPropinsi = [];
                 $scope.listPropinsi = data_propinsi;
             });
         };

         $scope.FetchPropinsi();

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.wilayah.propinsi_id) {
             $scope.validate.propinsi_id = false;
         }
         if ($scope.wilayah.kode) {
             $scope.validate.kode = false;
         }
         if ($scope.wilayah.nama_wilayah) {
             $scope.validate.nama_wilayah = false;
         }

         $scope.isValid = function () {
             if ($scope.wilayah.propinsi_id) {
                 $scope.validate.propinsi_id = false;
             } else {
                 $scope.validate.propinsi_id = true;
             }
             if ($scope.wilayah.kode) {
                 $scope.validate.kode = false;
             } else {
                 $scope.validate.kode = true;
             }
             if ($scope.wilayah.nama_wilayah) {
                 $scope.validate.nama_wilayah = false;
             } else {
                 $scope.validate.nama_wilayah = true;
             }


             if (!$scope.validate.nama_wilayah && !$scope.validate.kode && !$scope.validate.propinsi_id) {
                 return true;
             } else {
                 return false;
             }
         }


     });