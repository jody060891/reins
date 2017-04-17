angular.module('PKBL')
    .controller('NomorPerkiraanListCtrl',
        function NomorPerkiraanListCtrl($rootScope, $scope, $resource, $location, $modal, NomorPerkiraanService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/master/nomorPerkiraan/nomorPerkiraan-form/nomorPerkiraan-form.html',
                    controller: 'NomorPerkiraanFormCtrl',
                    resolve: {
                        nomorPerkiraanData: function () {
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
                        message = "Save Nomor Perkiraan failed. "+result.Message;
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'nomor_perkiraan',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['nomor_perkiraan', 'nama_perkiraan']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = NomorPerkiraanService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.listNomorPerkiraan = [];
                    var data_nomorPerkiraan = jsonResult.data.list;
                    var i = 0;
                    $scope.listNomorPerkiraan = data_nomorPerkiraan ;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                    //$rootScope.hideLoading();
                });
            };

            $scope.onCreateNew = function () {
             
                openModal({});
                ToastMessageService.removeAlerts();
            };

            $scope.onRowEdit = function (nomorPerkiraanData) {
             
                openModal(angular.copy(nomorPerkiraanData));
                ToastMessageService.removeAlerts();
            };

            $scope.onRowDelete = function (nomorPerkiraanData) {
                var sel = confirm("Are you sure you want to delete the Nomor Perkiraan [" + nomorPerkiraanData.nomor_perkiraan + "] ?");
                if (sel) {
                    var jsonResult = NomorPerkiraanService.Delete(nomorPerkiraanData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete Nomor Perkiraan failed');
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
