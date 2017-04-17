angular.module('PKBL')
    .controller('ListPinjamanCtrl',
        function ListPinjamanCtrl($rootScope, $scope, $resource, $location, $modal, $http, $timeout, PinjamanService,
                                 ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);

            $scope.keyword = {};

            $scope.mainScope = $scope;

            $scope.onProcessTemplate = "";
            $scope.normalTemplate = "";
            $scope.bermasalahTemplate = "";

            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/pengajuan-pinjaman-form/pengajuan-pinjaman-form.html',
                    controller: 'PinjamanFormCtrl',
                    resolve: {
                        pinjamanData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                    var messageType = "", message = "";
                    if (result.IsSuccess) {
                        messageType = "success";
                        message = "Data Saved Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Save Wilayah failed. "+result.Message;
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.FetchAllNotApprovedYetWithPagination();
                });
            };

            $scope.SearchQueryOnProcessTab = {
                page: 1,
                row_per_page: 10,
                sort_by: 'pinjaman_id',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword.keywordOnProcessTab,
                    fields: ['Pengusaha.nomor_register_pengusaha', 'ClusterPengusaha.nomor_register_cluster']
                }
            };

            $scope.FetchAllNotApprovedYetWithPagination = function () {
                $scope.SearchQueryOnProcessTab.search.keyword = $scope.keyword.keywordOnProcessTab;
                var jsonResult = PinjamanService.FetchAllNotApprovedYetWithPagination($scope.SearchQueryOnProcessTab, function () {
                    $scope.listPinjamanOnProcess = [];
                    var data_pinjamanOnProcess = jsonResult.data.list;
                    $scope.listPinjamanOnProcess = data_pinjamanOnProcess;
                    $scope.SearchQueryOnProcessTab.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                });
            };

            $scope.onCreateNew = function () {

                openModal({});
                ToastMessageService.removeAlerts();
            };

            $scope.onRowEditOnProcess = function (pinjamanData) {

                openModal(angular.copy(pinjamanData));
                ToastMessageService.removeAlerts();
            };

            $scope.onRowDelete = function (pinjamanData) {
                var sel = confirm("Are you sure you want to delete Pinjaman [" + pinjamanData.nomor_perjanjian + "] ?");
                if (sel) {
                    var jsonResult = PinjamanService.Delete(pinjamanData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete Pinjaman failed');
                        }

                    });
                }
            };


            $scope.onSearchOnProcessTab = function () {
                $scope.FetchAllNotApprovedYetWithPagination();
            };

            $scope.onPageChangedOnProcessTab = function (page) {
                $scope.SearchQueryOnProcessTab.page = page;
                $scope.FetchAllNotApprovedYetWithPagination();
            };

            $scope.onSortOnProcessTab = function (sortField) {
                if ($scope.SearchQueryOnProcessTab.sort_by == sortField)
                    $scope.SearchQueryOnProcessTab.is_sort_asc = !$scope.SearchQueryOnProcessTab.is_sort_asc;
                else
                    $scope.SearchQueryOnProcessTab.is_sort_asc = true;
                $scope.SearchQueryOnProcessTab.sort_by = sortField;
                $scope.FetchAllNotApprovedYetWithPagination();
            };

            $scope.onKeyPressOnProcessTab = function ($event) {
                if ($event.keyCode === 13) {
                    $scope.onSearchOnProcessTab();
                }
            };

            $scope.FetchAllNotApprovedYetWithPagination();

            $scope.onFetchNotApprovedYetWithPagination = function(){
                if ($scope.onProcessTemplate.length <= 0){
                    var url = "app/transaction/transaction-template/on-process.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.onProcessTemplate = template;
                    });
                }

                $timeout(function(){$scope.FetchAllNotApprovedYetWithPagination()}, 100);

            };

            $scope.onFetchNotApprovedYetWithPagination();

            $scope.onPenyaluranDana = function(pinjamanData){
                openModalPenyaluranDana(pinjamanData)
            };

            var openModalPenyaluranDana = function (data) {
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
                    $scope.FetchAllNotApprovedYetWithPagination();
                });
            };



            //Pinjaman Normal

            $scope.SearchQueryNormalTab = {
                page: 1,
                row_per_page: 10,
                sort_by: 'pinjaman_id',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword.keywordNormalTab,
                    fields: ['Pengusaha.nomor_register_pengusaha', 'ClusterPengusaha.nomor_register_cluster']
                }
            };

            $scope.FetchAllWithPagination = function () {
                $scope.SearchQueryNormalTab.search.keyword = $scope.keyword.keywordNormalTab;
                var jsonResult = PinjamanService.FetchAllWithPagination($scope.SearchQueryNormalTab, function () {
                    $scope.listPinjamanNormal = [];
                    var data_pinjamanNormal = jsonResult.data.list;
                    $scope.listPinjamanNormal = data_pinjamanNormal;
                    $scope.SearchQueryNormalTab.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                });
            };


            $scope.onRowEditNormal = function (pinjamanData) {

            };

            $scope.onRowDeleteNormal = function (pinjamanData) {
                var sel = confirm("Are you sure you want to delete Pinjaman [" + pinjamanData.nomor_perjanjian + "] ?");
                if (sel) {
                    var jsonResult = PinjamanService.Delete(pinjamanData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete Pinjaman failed');
                        }

                    });
                }
            };


            $scope.onSearchNormalTab = function () {
                $scope.FetchAllWithPagination();
            };

            $scope.onPageChangedNormalTab = function (page) {
                $scope.SearchQueryNormalTab.page = page;
                $scope.FetchAllWithPagination();
            };

            $scope.onSortNormalTab = function (sortField) {
                if ($scope.SearchQueryNormalTab.sort_by == sortField)
                    $scope.SearchQueryNormalTab.is_sort_asc = !$scope.SearchQueryNormalTab.is_sort_asc;
                else
                    $scope.SearchQueryNormalTab.is_sort_asc = true;
                $scope.SearchQueryNormalTab.sort_by = sortField;
                $scope.FetchAllWithPagination();
            };

            $scope.onKeyPressNormalTab = function ($event) {
                if ($event.keyCode === 13) {
                    $scope.onSearchNormalTab();
                }
            };

            $scope.onFetchAllWithPagination = function(){
                if ($scope.normalTemplate.length <= 0){
                    var url = "app/transaction/transaction-template/pinjaman-normal.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.normalTemplate = template;
                    });
                }

                $timeout(function(){$scope.FetchAllWithPagination()}, 100);

            };

            //Pinjaman Bermasalah

            $scope.SearchQueryBermasalahTab = {
                page: 1,
                row_per_page: 10,
                sort_by: 'pinjaman_id',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword.keywordBermasalahTab,
                    fields: ['Pengusaha.nomor_register_pengusaha', 'ClusterPengusaha.nomor_register_cluster']
                }
            };

            $scope.FetchAllWithPaginationBermasalahTab = function () {
                $scope.SearchQueryBermasalahTab.search.keyword = $scope.keyword.keywordBermasalahTab;
                var jsonResult = PinjamanService.FetchAllPinjamanBermasalahWithPagination($scope.SearchQueryBermasalahTab, function () {
                    $scope.listPinjamanBermasalah = [];
                    var data_pinjamanBermasalah = jsonResult.data.list;
                    $scope.listPinjamanBermasalah = data_pinjamanBermasalah;
                    $scope.SearchQueryBermasalahTab.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                });
            };


            $scope.onRowEditBermasalah = function (pinjamanData) {

            };

            $scope.onRowDeleteBermasalah = function (pinjamanData) {
                var sel = confirm("Are you sure you want to delete Pinjaman [" + pinjamanData.nomor_perjanjian + "] ?");
                if (sel) {
                    var jsonResult = PinjamanService.Delete(pinjamanData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete Pinjaman failed');
                        }

                    });
                }
            };


            $scope.onSearchBermasalahTab = function () {
                $scope.FetchAllWithPaginationBermasalahTab();
            };

            $scope.onPageChangedBermasalahTab = function (page) {
                $scope.SearchQueryBermasalahTab.page = page;
                $scope.FetchAllWithPaginationBermasalahTab();
            };

            $scope.onSortBermasalahTab = function (sortField) {
                if ($scope.SearchQueryBermasalahTab.sort_by == sortField)
                    $scope.SearchQueryBermasalahTab.is_sort_asc = !$scope.SearchQueryBermasalahTab.is_sort_asc;
                else
                    $scope.SearchQueryBermasalahTab.is_sort_asc = true;
                $scope.SearchQueryBermasalahTab.sort_by = sortField;
                $scope.FetchAllWithPaginationBermasalahTab();
            };

            $scope.onKeyPressBermasalahTab = function ($event) {
                if ($event.keyCode === 13) {
                    $scope.onSearchBermasalahTab();
                }
            };

            $scope.onFetchAllWithPaginationBermasalah = function(){
                if ($scope.bermasalahTemplate.length <= 0){
                    var url = "app/transaction/transaction-template/pinjaman-bermasalah.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.bermasalahTemplate = template;
                    });
                }

                $timeout(function(){$scope.FetchAllWithPaginationBermasalahTab()}, 100);

            };

            var openModalPembayaranAngsuran = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/angsuran-list/angsuran-form/angsuran-form.html',
                    controller: 'AngsuranFormCtrl',
                    windowClass: 'modal-large',
                    resolve: {
                        pinjamanData: function(){
                            return data;
                        }
                    }
                }).result.then(function (result) {
                    $scope.FetchAllWithPaginationBermasalahTab();
                });
            };

            $scope.onPembayaranAngsuran = function(pinjamanData){
                openModalPembayaranAngsuran(pinjamanData);
            };

            $scope.FetchAllWithPaginationBermasalahTab();

            var openModalDetailTransaksi = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/pinjaman-transaksi-detail/pinjaman-transaksi-detail.html',
                    controller: 'PinjamanDetailTransaksiCtrl',
                    windowClass: 'modal-large',
                    resolve: {
                        pinjamanData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                });
            };

            $scope.onViewDetailTransaksi = function(pinjamanData){
                openModalDetailTransaksi(pinjamanData);
            };

        });
