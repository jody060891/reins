angular.module('PKBL')
    .controller('PropinsiListCtrl',
        function PropinsiListCtrl($rootScope, $scope, $resource, $location, $modal, PropinsiService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/master/propinsi/propinsi-form/propinsi-form.html',
                    controller: 'PropinsiFormCtrl',
                    resolve: {
                        propinsiData: function () {
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
                        message = "Save Provinsi failed. "+result.Message;
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'kode_propinsi',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['kode_propinsi', 'nama_propinsi']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = PropinsiService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.listPropinsi = [];
                    var data_propinsi = jsonResult.data.list;
                    var i = 0;
                    $scope.listPropinsi = data_propinsi;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                    //$rootScope.hideLoading();
                });
            };

            $scope.onCreateNew = function () {
             
                openModal({});
                ToastMessageService.removeAlerts();
            };

            $scope.onRowEdit = function (propinsiData) {
             
                openModal(angular.copy(propinsiData));
                ToastMessageService.removeAlerts();
            };

            $scope.onRowDelete = function (propinsiData) {
                var sel = confirm("Are you sure you want to delete the Provinsi [" + propinsiData.nama_propinsi + "] ?");
                if (sel) {
                    var jsonResult = PropinsiService.Delete(propinsiData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete Provinsi failed');
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
