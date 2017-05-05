angular.module('PKBL')
    .controller('PenyaluranDanaDetailCtrl',
     function PenyaluranDanaDetailCtrl($rootScope, $scope, $resource, $location, $modalInstance, penyaluranDanaData, PinjamanService,
            PenyaluranDanaService) {
         $scope.penyaluranDana = angular.copy(penyaluranDanaData);

         $scope.Fetch = function(){
             var jsonResult = PenyaluranDanaService.FetchOne({penyaluranDanaId:$scope.penyaluranDana.penyaluran_dana_id}, function(){
                var data_penyaluranDana = jsonResult.data;
                $scope.penyaluranDana = data_penyaluranDana;
             });
         };

         $scope.Fetch();

         $scope.FetchPinjaman = function(){
             var jsonResult = PinjamanService.FetchOne({pinjamanId:$scope.penyaluranDana.pinjaman_id},function(){
                var data_pinjaman= jsonResult.data;
                $scope.pinjaman = data_pinjaman;
             });
         };

         $scope.FetchPinjaman();

     });