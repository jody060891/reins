angular.module('PKBL')
    .controller('WilayahListCtrl',
        function WilayahListCtrl($rootScope, $scope, $resource, $location, $modal, WilayahService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/master/wilayah/wilayah-form/wilayah-form.html',
                    controller: 'WilayahFormCtrl',
                    resolve: {
                        wilayahData: function () {
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
                    fields: ['kode', 'nama_wilayah']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = WilayahService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.listWilayah = [];
                    var data_wilayah = jsonResult.data.list;
                    var i = 0;
                    $scope.listWilayah = data_wilayah;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                    //$rootScope.hideLoading();
                });
            };

            $scope.onCreateNew = function () {
             
                openModal({});
                ToastMessageService.removeAlerts();
            };

            $scope.onRowEdit = function (wilayahData) {
             
                openModal(angular.copy(wilayahData));
                ToastMessageService.removeAlerts();
            };

            $scope.onRowDelete = function (wilayahData) {
                var sel = confirm("Are you sure you want to delete the Wilayah [" + wilayahData.nama_wilayah + "] ?");
                if (sel) {
                    var jsonResult = WilayahService.Delete(wilayahData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete Wilayah failed');
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
