angular.module('PKBL')
    .controller('PenyaluranDanaListCtrl',
        function PenyaluranDanaListCtrl($rootScope, $scope, $resource, $location, $modal, PenyaluranDanaService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/penyaluran-dana-list/penyaluran-dana-detail/penyaluran-dana-detail.html',
                    controller: 'PenyaluranDanaDetailCtrl',
                    windowClass: 'modal-large',
                    resolve: {
                        penyaluranDanaData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'nomor_bukti',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['nomor_bukti', 'Pinjaman.nomor_register']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = PenyaluranDanaService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.listPenyaluranDana = [];
                    var data_penyaluranDana = jsonResult.data.list;
                    $scope.listPenyaluranDana  = data_penyaluranDana;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                });
            };

            $scope.onViewDetail = function (penyaluranDanaData) {

                openModal(penyaluranDanaData);
            };




            $scope.onSearch = function () {
                $scope.Fetch();
            };

            $scope.onPageChanged = function (page) {
                $scope.SearchQuery.page = page;
                //console.log($scope.SearchQuery);
                $scope.Fetch();
            };

            $scope.onSort = function (sortField) {
                if ($scope.SearchQuery.sort_by == sortField)
                    $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
                else
                    $scope.SearchQuery.is_sort_asc = true;
                $scope.SearchQuery.sort_by = sortField;
                $scope.Fetch();
            };

            $scope.onKeyPress = function ($event) {
                if ($event.keyCode === 13) {
                    $scope.onSearch();
                }
            };

            var openModalAdd = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/penyaluran-dana-form/penyaluran-dana-form.html',
                    controller: 'PenyaluranDanaFormCtrl',
                    resolve: {
                        pinjamanData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                    var messageType = "", message = "";
                    if (result.IsSuccess) {
                        messageType = "success";
                        message = "Penyaluran Dana Berhasil disimpan";
                    } else {
                        messageType = "danger";
                        message = "Penyaluran Dana Gagal disimpan. "+result.Message;
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.onCreateNew = function(){
                openModalAdd({});
            };

            $scope.Fetch();
        });
