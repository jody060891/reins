angular.module('PKBL')
    .controller('PenyaluranDanaFormCtrl',
     function PenyaluranDanaFormCtrl($rootScope, $timeout, $scope, $modal, $resource, $location, $modalInstance, ToastMessageService, pinjamanData,
            JenisPinjamanService, PinjamanService, NomorPerkiraanService, PenyaluranDanaService) {
         $scope.pinjaman = angular.copy(pinjamanData);
         $scope.penyaluranDana = {};
         $scope.penyaluranDana.Pinjaman = $scope.pinjaman;
         $scope.keyword = {};

         $scope.FetchPinjaman = function(){
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
                     $scope.penyaluranDana.Pinjaman = $scope.pinjaman;
                     $scope.penyaluranDana.pinjaman_id = $scope.pinjaman.pinjaman_id;
                     $scope.penyaluranDana.penyaluran_ke = $scope.pinjaman.TransaksiPenyaluranDana.length + 1;
                 }
             );
         };

         if($scope.pinjaman.pinjaman_id != null){
             $scope.FetchPinjaman();
         }else{
             $scope.penyaluranDana.penyaluran_ke = 1;
         }

         // if($scope.pinjaman.pinjaman_id != null){
         //     var jsonResult = PinjamanService.FetchOne(
         //         {
         //             pinjamanId: $scope.pinjaman.pinjaman_id
         //         }, function(){
         //             var data_pinjaman = jsonResult.data;
         //             $scope.pinjaman = data_pinjaman;
         //
         //             if($scope.pinjaman.pengusaha_id != null){
         //                 $scope.pinjaman.tipe = "PERSONAL";
         //                 $scope.keyword.keyword = $scope.pinjaman.Pengusaha.nomor_register_pengusaha;
         //             }
         //             if($scope.pinjaman.cluster_pengusaha_id != null){
         //                 $scope.pinjaman.tipe = "CLUSTER";
         //                 $scope.keyword.keyword = $scope.pinjaman.ClusterPengusaha.nomor_register_cluster;
         //             }
         //             $scope.penyaluranDana.Pinjaman = $scope.pinjaman;
         //             $scope.penyaluranDana.pinjaman_id = $scope.pinjaman.pinjaman_id;
         //         }
         //     )
         // }

         $scope.FetchNomorPerkiraan = function(){
             var jsonResult = NomorPerkiraanService.FetchAll(function(){
                 var data_nomorPerkiraan = jsonResult.data;
                 $scope.listNomorPerkiraan = [];
                 $scope.listNomorPerkiraan = data_nomorPerkiraan;
             });
         };

         $scope.FetchNomorPerkiraan();


         $scope.datePickerOpen = function (id) {
             $timeout(function () {
                 $("#" + id).focus();
             });
         };

         $scope.onSave = function (pinjamanData) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = PenyaluranDanaService.Save($scope.pinjaman, function () {
                     $modalInstance.close(result.data);
                 });
             }
         };

         $scope.Submit = function(penyaluranDana){
             if($scope.isValid()){
                 $scope.validate.button = false;
                 var result = PenyaluranDanaService.Save($scope.penyaluranDana, function () {
                     $modalInstance.close(result.data);
                 });
             }
         };


         $scope.validate = {};
         $scope.validate.button = true;



         $scope.isValid = function () {
             return true;
         };

         var openModal = function () {
             $modal.open({
                 templateUrl: 'app/transaction/angsuran-list/angsuran-form/search-pinjaman/search-pinjaman.html',
                 controller: 'SearchPinjamanCtrl',
                 resolve: {
                     keywordData: function () {
                         return $scope.keyword.keyword;
                     }
                 }
             }).result.then(function (result) {
                 $scope.pinjaman = result;
                 $scope.FetchPinjaman();
             });
         };

         $scope.onSearchPinjaman = function(){
             openModal();
         };


     });