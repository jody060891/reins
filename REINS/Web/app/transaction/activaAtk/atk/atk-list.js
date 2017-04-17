angular.module('PKBL')
    .controller('AtkListCtrl',
        function AtkListCtrl($rootScope, $scope, $resource, $location, $modal, UserAclSessionData,
            ToastMessageService, SessionService, AtkJenisBisnisService, AtkBdatkService) {
            SessionService.setAclSession(UserAclSessionData);
            console.log(UserAclSessionData);
            SessionService.setAcltoScope($scope);

            $scope.keyword = {};
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/transaction/activaAtk/atk/atk-lis.html',
                    controller: 'PenyaluranDanaDetailCtrl',
                    windowClass: 'modal-large',
                    resolve: {
                        atkData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'NoUrut',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['NoUrut', 'NomAtk']
                }
            };

            $scope.FetchAtkJenisBisnis = function(){
                var jsonResult = AtkJenisBisnisService.FetchAll(function(){
                    $scope.atkJenisBisnisList = jsonResult.data;
                });
            };
            $scope.FetchAtkJenisBisnis();

            $scope.Fetch = function () {
                // $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = AtkBdatkService.FetchAllWithPagination(
                    {
                        searchQuery: $scope.SearchQuery,
                        atkBdatkSearch: $scope.keyword
                    }, function () {
                    $scope.listAtk = [];
                    var data_Atk = jsonResult.data.list;
                    $scope.listAtk  = data_Atk;
                    console.log(data_Atk);
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                });
            };
            $scope.Fetch();

            $scope.onViewDetail = function (penyaluranDanaData) {
             
                openModal(penyaluranDanaData);
            };




            $scope.onSearch = function () {
                $scope.SearchQuery.page = 1;
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
