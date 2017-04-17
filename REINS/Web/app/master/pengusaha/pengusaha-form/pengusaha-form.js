angular.module('PKBL')
    .controller('PengusahaFormCtrl',
    function PengusahaFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, PengusahaService, pengusahaData,
                                WilayahService, PropinsiService, JenisUsahaService) {
        $scope.pengusaha = angular.copy(pengusahaData);
        $scope.validate = {};

        $scope.validate.button = true;
        
        if ($scope.pengusaha.nama_pengusaha) {
            $scope.validate.nama_pengusaha = false;
        }
        if ($scope.pengusaha.nama_pengurus) {
            $scope.validate.nama_pengurus = false;
        }
        
        $scope.isValid = function () {
            if ($scope.pengusaha.nama_pengusaha) {
                $scope.validate.nama_pengusaha = false;
            }else{
                $scope.validate.nama_pengusaha = true;
            }
            if ($scope.pengusaha.nama_pengurus) {
                $scope.validate.nama_pengurus = false;
            }else{
                $scope.validate.nama_pengurus = true;
            }

            if (!$scope.validate.nama_pengusaha && !$scope.validate.nama_pengurus) {
                return true;
            } else {
                return false;
            }
        };



        $scope.FetchJenisUsaha = function(){
            var jsonResult = JenisUsahaService.FetchAll(function(){
                var data_jenis_usaha = jsonResult.data;
                $scope.listJenisUsaha = [];
                $scope.listJenisUsaha = data_jenis_usaha;
            });
        };

        $scope.FetchJenisUsaha();


        $scope.FetchPropinsi = function(){
            var jsonResult = PropinsiService.FetchAll(function(){
                var data_propinsi = jsonResult.data;
                $scope.listPropinsi = [];
                $scope.listPropinsi = data_propinsi;
            });
        };



        $scope.FetchWilayah = function(){
            var propinsiId = ($scope.pengusaha == null || $scope.pengusaha.propinsi_id == null) ? 0: $scope.pengusaha.propinsi_id;
            var jsonResult = WilayahService.FetchAllByPropinsiId(
                {propinsiId: propinsiId}
                , function(){
                var data_wilayah = jsonResult.data;
                $scope.listWilayah = [];
                $scope.listWilayah = data_wilayah;
            });
        };

        $scope.FetchPropinsi();

        $scope.FetchOne = function(){
            var pengusahaId = $scope.pengusaha.pengusaha_id? $scope.pengusaha.pengusaha_id: 0;
            if(pengusahaId != 0){
                var jsonResult = PengusahaService.FetchOne({pengusahaId:pengusahaId}, function(){
                    $scope.pengusaha = jsonResult.data;
                    $scope.pengusaha.propinsi_id = $scope.pengusaha.Wilayah.propinsi_id;
                    $scope.FetchPropinsi();
                    $scope.FetchWilayah();
                });
            }

        };
        $scope.FetchOne();

        $scope.onSave = function (pengusahaData) {
            if ($scope.isValid()) {
                $scope.validate.button = false;
                var result = PengusahaService.Save(pengusahaData, function () {
                    $modalInstance.close(result.data);

                });
            }
        };

    });