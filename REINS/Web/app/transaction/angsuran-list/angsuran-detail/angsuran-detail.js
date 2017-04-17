angular.module('PKBL')
    .controller('AngsuranDetailCtrl',
     function AngsuranDetailCtrl($rootScope, $scope, $resource, $location, $modalInstance, angsuranData, PinjamanService,
            AngsuranService) {
         $scope.angsuran = angular.copy(angsuranData);

         $scope.Fetch = function(){
             var jsonResult = AngsuranService.FetchOne({angsuranId:$scope.angsuran.transaksi_angsuran_id}, function(){
                var data_angsuran = jsonResult.data;
                $scope.angsuran = data_angsuran;
             });
         };

         $scope.Fetch();

         $scope.FetchPinjaman = function(){
             var jsonResult = PinjamanService.FetchOne({pinjamanId:$scope.angsuran.pinjaman_id},function(){
                var data_pinjaman= jsonResult.data;
                $scope.pinjaman = data_pinjaman;
             });
         };

         $scope.FetchPinjaman();

     });