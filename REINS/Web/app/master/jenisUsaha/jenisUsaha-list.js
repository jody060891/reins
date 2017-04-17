angular.module('PKBL')
    .controller('JenisUsahaListCtrl',
        function JenisUsahaListCtrl($rootScope, $scope, $resource, $location, $modal, JenisUsahaService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/master/jenisUsaha/jenisUsaha-form/jenisUsaha-form.html',
                    controller: 'JenisUsahaFormCtrl',
                    resolve: {
                        jenisUsahaData: function () {
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
                        message = "Save Jenis Usaha failed. "+result.Message;
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'kode',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['kode', 'nama_jenis_usaha']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = JenisUsahaService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.listJenisUsaha = [];
                    var data_jenisUsaha = jsonResult.data.list;
                    var i = 0;
                    $scope.listJenisUsaha = data_jenisUsaha;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                    //$rootScope.hideLoading();
                });
            };

            $scope.onCreateNew = function () {
             
                openModal({});
                ToastMessageService.removeAlerts();
            };

            $scope.onRowEdit = function (jenisUsahaData) {
             
                openModal(angular.copy(jenisUsahaData));
                ToastMessageService.removeAlerts();
            };

            $scope.onRowDelete = function (jenisUsahaData) {
                var sel = confirm("Are you sure you want to delete the Jenis Usaha [" + jenisUsahaData.nama_jenis_usaha + "] ?");
                if (sel) {
                    var jsonResult = JenisUsahaService.Delete(jenisUsahaData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete jenis usaha failed');
                        }
                        
                    });
                }
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
