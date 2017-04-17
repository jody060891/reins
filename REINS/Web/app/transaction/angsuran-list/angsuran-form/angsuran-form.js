angular.module('PKBL')
    .controller('AngsuranFormCtrl',
     function AngsuranFormCtrl($rootScope, $timeout, $scope, $modal, $resource, $location, $modalInstance, ToastMessageService, pinjamanData,
            JenisPinjamanService, PinjamanService, NomorPerkiraanService, AngsuranService) {
         $scope.pinjaman = angular.copy(pinjamanData);
         $scope.angsuran = {};
         $scope.angsuran.Pinjaman = $scope.pinjaman;
         $scope.keyword = {};

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
                     $scope.angsuran.Pinjaman = $scope.pinjaman;
                     $scope.angsuran.pinjaman_id = $scope.pinjaman.pinjaman_id;
                     $scope.angsuran.angsuran_ke = $scope.pinjaman.TransaksiAngsuran.length + 1;
                 }
             );
         };

         if($scope.pinjaman.pinjaman_id != null){
             $scope.FetchPinjaman();
         }else{
             $scope.angsuran.angsuran_ke = 1;
         }

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

         $scope.onSave = function (angsuran) {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 var result = AngsuranService.Save($scope.angsuran, function () {
                     $modalInstance.close(result.data);
                 });
             }
         };

         $scope.Submit = function(angsuran){
             if($scope.isValid()){
                 $scope.validate.button = false;
                 var result = AngsuranService.Save($scope.angsuran, function () {
                     $modalInstance.close(result.data);
                 });
             }
         };


         $scope.validate = {};
         $scope.validate.button = true;



         $scope.isValid = function () {
             return true;
         };


        $scope.onCalculateJumlahAngsuran = function(){
            var angsuranPokok = ($scope.angsuran.angsuran_pokok != null)?($scope.angsuran.angsuran_pokok):0;
            var denda = ($scope.angsuran.denda != null)?($scope.angsuran.denda):0;
            var angsuranBunga = ($scope.angsuran.angsuran_bunga!= null)?($scope.angsuran.angsuran_bunga):0;
            $scope.angsuran.jumlah_angsuran = parseInt(angsuranPokok)+parseInt(denda)+parseInt(angsuranBunga);
        }

     });