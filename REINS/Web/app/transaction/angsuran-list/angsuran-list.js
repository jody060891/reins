angular.module('PKBL')
    .controller('AngsuranListCtrl',
        function AngsuranListCtrl($rootScope, $scope, $resource, $location, $modal, AngsuranService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/angsuran-list/angsuran-detail/angsuran-detail.html',
                    controller: 'AngsuranDetailCtrl',
                    windowClass: 'modal-large',
                    resolve: {
                        angsuranData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                });
            };

            var openModalAdd = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/angsuran-list/angsuran-form/angsuran-form.html',
                    controller: 'AngsuranFormCtrl',
                    windowClass: 'modal-large',
                    resolve: {
                        angsuranData: function () {
                            return data;
                        },
                        pinjamanData: function(){
                            return {};
                        }
                    }
                }).result.then(function (result) {
                    $scope.Fetch();
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
                var jsonResult = AngsuranService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.listAngsuran= [];
                    var data_angsuran = jsonResult.data.list;
                    $scope.listAngsuran = data_angsuran;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                });
            };

            $scope.onViewDetail = function (angsuranData) {
             
                openModal(angsuranData);
            };

            $scope.onCreateNew = function(){
                openModalAdd({});
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

            $scope.Fetch();
        });
