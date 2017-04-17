angular.module('PKBL')
    .controller('PinjamanFormCtrl',
     function PinjamanFormCtrl($rootScope, $timeout, $scope, $modal, $resource, $location, $modalInstance, ToastMessageService, pinjamanData,
            JenisPinjamanService, PinjamanService, PropinsiService) {
         $scope.pinjaman = angular.copy(pinjamanData);
         $scope.keyword = {};

         if($scope.pinjaman.pinjaman_id != null){
             var jsonResult = PinjamanService.FetchOne(
                 {
                     pinjamanId: $scope.pinjaman.pinjaman_id
                 }, function(){
                     var data_pinjaman = jsonResult.data;
                     $scope.pinjaman = data_pinjaman;

                     if($scope.pinjaman.pengusaha_id != null){
                         $scope.pinjaman.tipe = "PERSONAL";
                         $scope.keyword.keyword = $scope.pinjaman.Pengusaha.nomor_register_pengusaha;
                     }
                     if($scope.pinjaman.cluster_pengusaha_id != null){
                         $scope.pinjaman.tipe = "CLUSTER";
                         $scope.keyword.keyword = $scope.pinjaman.ClusterPengusaha.nomor_register_cluster;
                     }
                 }
             )
         }


         $scope.onChangeTipe = function(){
            $scope.pinjaman.Jaminan = [];
            if($scope.pinjaman.tipe == "CLUSTER"){
                $scope.maxJaminan = 20;
                $scope.pinjaman.pengusaha_id = null;
                $scope.pinjaman.Pengusaha = null;
                $scope.pinjaman.nomor_perjanjian = null;
            }else if($scope.pinjaman.tipe == "PERSONAL"){
                $scope.maxJaminan = 1;
                $scope.pinjaman.cluster_pengusaha_id = null;
                $scope.pinjaman.ClusterPengusaha = null;
                $scope.pinjaman.nomor_perjanjian = null;
            }
         };

         $scope.datePickerOpen = function (id) {
             $timeout(function () {
                 $("#" + id).focus();
             });
         };

         $scope.onSave = function (pinjamanData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = PinjamanService.Save($scope.pinjaman, function () {
                     $modalInstance.close(result.data);
                 });
             }
         };

         $scope.FetchJenisPinjaman = function(){
             var jsonResult = JenisPinjamanService.FetchAll(function(){
                 var data_jenisPinjaman = jsonResult.data;
                 $scope.listJenisPinjaman = [];
                 $scope.listJenisPinjaman = data_jenisPinjaman;
             });
         };

         $scope.FetchJenisPinjaman();




         var openModal = function () {
             $modal.open({
                 templateUrl: 'app/transaction/search-nomor-register/search-nomor-register.html',
                 controller: 'SearchNomorRegisterCtrl',
                 resolve: {
                     keywordData: function () {
                         return $scope.keyword.keyword;
                     },
                     tipePinjamanData: function(){
                         return $scope.pinjaman.tipe;
                     }
                 }
             }).result.then(function (result) {
                 if($scope.pinjaman.tipe == "CLUSTER"){
                     $scope.pinjaman.cluster_pengusaha_id = result.cluster_pengusaha_id;
                     $scope.pinjaman.ClusterPengusaha = result;
                     $scope.pinjaman.nomor_perjanjian = result.nomor_perjanjian;
                     $scope.keyword.keyword = result.nomor_register_cluster;
                     $scope.pinjaman.nomor_register = result.nomor_register_cluster;
                 }else if($scope.pinjaman.tipe == "PERSONAL"){
                     $scope.pinjaman.pengusaha_id = result.pengusaha_id;
                     $scope.pinjaman.Pengusaha = result;
                     $scope.pinjaman.nomor_perjanjian = result.nomor_perjanjian;
                     $scope.keyword.keyword = result.nomor_register_pengusaha;
                     $scope.pinjaman.nomor_register = result.nomor_register_pengusaha;
                 }
             });
         };

         $scope.onSearchRegister = function(){
             if($scope.pinjaman.tipe != null && $scope.pinjaman.tipe != ""){
                 openModal();
                 $scope.validate.tipe = false;
             }else{
                $scope.validate.tipe = true;
             }

         }

         $scope.validate = {};
         $scope.validate.button = true;



         $scope.isValid = function () {
             // if ($scope.wilayah.propinsi_id) {
             //     $scope.validate.propinsi_id = false;
             // } else {
             //     $scope.validate.propinsi_id = true;
             // }
             // if ($scope.wilayah.kode) {
             //     $scope.validate.kode = false;
             // } else {
             //     $scope.validate.kode = true;
             // }
             // if ($scope.wilayah.nama_wilayah) {
             //     $scope.validate.nama_wilayah = false;
             // } else {
             //     $scope.validate.nama_wilayah = true;
             // }
             //
             //
             // if (!$scope.validate.nama_wilayah && !$scope.validate.kode && !$scope.validate.propinsi_id) {
             //     return true;
             // } else {
             //     return false;
             // }
             return true;
         };

         $scope.onEditJaminan = function(data){
            openJaminanFormModal(data);
         };

         $scope.onAddJaminan = function(){
            openJaminanFormModal({jaminan_id:0});
         };

         $scope.onDeleteJaminan = function(data){
             if (confirm('Are you sure you want to delete this Jaminan?')) {
                 data.is_active = false;
                 ToastMessageService.addAlerts('success', "Jaminan deleted successfully");
             }
         };

         var openJaminanFormModal = function (data) {
             $modal.open({
                 templateUrl: 'app/transaction/jaminan-form/jaminan-form.html',
                 controller: 'JaminanFormCtrl',
                 resolve: {
                     pinjamanId: function () {
                         return $scope.pinjaman!= null?$scope.pinjaman.pinjaman_id : 0;
                     },
                     jaminanPinjaman: function () {
                         return data;
                     }
                 }
             }).result.then(function (result) {
                 if($scope.pinjaman == null){
                     $scope.pinjaman = {};
                     $scope.pinjaman.Jaminan = [];
                 }
                 var indexJaminan = -1;
                 angular.forEach($scope.pinjaman.Jaminan, function(anggota, key){
                     if(anggota.$$hashKey == result.$$hashKey)
                         indexJaminan = key;
                 });
                 if($scope.pinjaman.Jaminan == null || $scope.pinjaman.Jaminan.length == 0
                     || indexJaminan < 0){
                     if($scope.pinjaman.Jaminan == null || $scope.pinjaman.Jaminan.length == 0)
                         $scope.pinjaman.Jaminan = [];
                     $scope.pinjaman.Jaminan.push(result);
                 }else{

                     $scope.pinjaman.Jaminan[indexJaminan] = result;
                 }
             });
         };


     });