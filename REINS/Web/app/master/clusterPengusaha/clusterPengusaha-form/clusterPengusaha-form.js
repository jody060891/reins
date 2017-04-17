angular.module('PKBL')
    .controller('ClusterPengusahaFormCtrl',
    function ClusterPengusahaFormCtrl($rootScope, $scope, $resource, $location, $filter, $modal, $modalInstance, ClusterPengusahaService, clusterPengusahaData,
                                WilayahService, PropinsiService, JenisUsahaService) {
        $scope.clusterPengusaha = {};
        $scope.clusterPengusaha = angular.copy(clusterPengusahaData);
        $scope.validate = {};

        $scope.validate.button = true;
        
        if ($scope.clusterPengusaha.nama_cluster) {
            $scope.validate.nama_cluster = false;
        }
        
        $scope.isValid = function () {
            if ($scope.clusterPengusaha.nama_cluster) {
                $scope.validate.nama_cluster = false;
            }else{
                $scope.validate.nama_cluster = true;
            }


            if (!$scope.validate.nama_cluster && !$scope.validate.maxKetua && !$scope.validate.minKetua) {
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


        var openAddAnggotaModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/clusterPengusaha/add-cluster-anggota/add-cluster-anggota.html',
                controller: 'AddClusterAnggotaCtrl',
                resolve: {
                    clusterPengusahaId: function () {
                        return $scope.clusterPengusaha!= null?$scope.clusterPengusaha.cluster_pengusaha_id : 0;
                    },
                    anggotaClusterPengusaha: function () {
                        return data;
                    }
                }
            }).result.then(function (result) {
                if($scope.clusterPengusaha == null){
                    $scope.clusterPengusaha = {};
                    $scope.clusterPengusaha.AnggotaPengusaha = [];
                }
                var indexAnggota = -1;
                angular.forEach($scope.clusterPengusaha.AnggotaPengusaha, function(anggota, key){
                    if(anggota.$$hashKey == result.$$hashKey)
                        indexAnggota = key;
                });
                if($scope.clusterPengusaha.AnggotaPengusaha == null || $scope.clusterPengusaha.AnggotaPengusaha.length == 0
                    || indexAnggota < 0){
                    result.cluster_jabatan = "ANGGOTA";
                    if($scope.clusterPengusaha.AnggotaPengusaha == null || $scope.clusterPengusaha.AnggotaPengusaha.length == 0)
                        $scope.clusterPengusaha.AnggotaPengusaha = [];
                    $scope.clusterPengusaha.AnggotaPengusaha.push(result);
                }else{

                    $scope.clusterPengusaha.AnggotaPengusaha[indexAnggota] = result;
                }

            });
        };

        $scope.onAddAnggota = function () {
            openAddAnggotaModal({});
        };

        $scope.onEditAnggota = function(dataAnggota) {
            openAddAnggotaModal(dataAnggota);
        };

        $scope.checkPosisi = function(){
            $scope.validate.maxKetua = false;
            $scope.validate.minKetua = false;
            $scope.validate.maxSekretaris = false;
            $scope.validate.minSekretaris = false;
            var ketua = [];
            var sekretaris = [];
            var bendahara = [];
            var anggota = [];
            angular.forEach($scope.clusterPengusaha.AnggotaPengusaha, function(anggotaPengusaha, key){
                if(anggotaPengusaha.cluster_jabatan == "KETUA"){
                    ketua.push(anggotaPengusaha);
                }
                if(anggotaPengusaha.cluster_jabatan == "SEKRETARIS"){
                    sekretaris.push(anggotaPengusaha);
                }
                if(anggotaPengusaha.cluster_jabatan == "BENDAHARA"){
                    bendahara.push(anggotaPengusaha);
                }
            });

            if(ketua.length > 1){
                $scope.validate.maxKetua = true;
            }else if(ketua.length < 1){
                $scope.validate.minKetua = true;
            }

            if(sekretaris.length > 1){
                $scope.validate.maxSekretaris = true;
            }else if(ketua.length < 1){
                $scope.validate.minSekretaris = true;
            }
        };

        $scope.onSave = function (clusterPengusahaData) {
            if ($scope.isValid()) {
                $scope.validate.button = false;
                var result = ClusterPengusahaService.Save(clusterPengusahaData, function () {
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


        $scope.FetchWilayah = function(){
            var propinsiId = $scope.clusterPengusaha.propinsi_id == null ? 0: $scope.clusterPengusaha.propinsi_id;
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
            var clusterPengusahaId = clusterPengusahaData.cluster_pengusaha_id? clusterPengusahaData.cluster_pengusaha_id: 0;

            var jsonResult = ClusterPengusahaService.FetchOne({clusterPengusahaId:clusterPengusahaId}, function(){
                $scope.clusterPengusaha = jsonResult.data;
                $scope.clusterPengusaha.propinsi_id = $scope.clusterPengusaha.Wilayah.propinsi_id;
                $scope.FetchPropinsi();
                $scope.FetchWilayah();
            });
        };
        $scope.FetchOne();






    });