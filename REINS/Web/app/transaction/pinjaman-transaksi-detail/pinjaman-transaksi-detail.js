angular.module('PKBL')
    .controller('PinjamanDetailTransaksiCtrl',
     function PinjamanDetailTransaksiCtrl($rootScope, $scope, $resource, $location, $modalInstance, pinjamanData, PinjamanService) {
         $scope.pinjaman = angular.copy(pinjamanData);

         $scope.Fetch = function(){
             var jsonResult = PinjamanService.FetchOne({pinjamanId:$scope.pinjaman.pinjaman_id}, function(){
                var data_pinjaman = jsonResult.data;
                $scope.pinjaman = data_pinjaman;
                $scope.pinjaman.jenis_transaksi = "ALL";
             });
         };

         $scope.Fetch();


         $scope.onFilterTransaksi = function(transaksi){
             if($scope.pinjaman.jenis_transaksi != "ALL"){
                 return transaksi.jenis_transaksi == $scope.pinjaman.jenis_transaksi;
             }else{
                 return true;
             }
         }

     });