angular.module('HITS')
    .controller('RoleListCtrl',
        function RoleListCtrl($scope, $resource, $location, $modal, RoleService, ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            if (!$scope.currentAcl['SM_USER_MANAGEMENT_ROLE_VIEW']){
                $location.path('/unauthorized');
            }

            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/master/role/form/role-form.html',
                    controller: 'RoleFormCtrl',
                    windowClass: 'modal-medium',
                    resolve: {
                        roleData: function () {
                            return data;
                        }
                    }
                }).result.then(function (result) {

                    var messageType = "", message = "";
                    if (result) {
                        messageType = "success";
                        message = "Data Saved Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Save role failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'role_name',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['role_name']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = RoleService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.roles = [];
                    var dataRoles = jsonResult.data.list;
                    $scope.roles = dataRoles;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                });
            };

            $scope.onCreateNew = function () {
                openModal({
                    role_id : null
            });
            };

            $scope.onRowEdit = function (data) {
                openModal(angular.copy(data));
            };

            $scope.onRowDelete = function (data) {
                var sel = confirm("Are you sure you want to delete the Role [" + data.role_name + "] ?");
                if (sel) {
                    var jsonResult = RoleService.Delete(data, function () {
                        var messageType = "", message = "";
                        if (jsonResult) {
                            messageType = "success";
                            message = "Data Deleted Succesfully";
                        } else {
                            messageType = "danger";
                            message = "Delete role failed";
                        }
                        ToastMessageService.addAlerts(messageType, message);
                        $scope.Fetch();
                    });
                }
            };


            $scope.onSearch = function () {
                $scope.Fetch();
            };

            $scope.onKeyPress = function ($event) {
                if ($event.keyCode === 13) {
                    $scope.onSearch();
                }
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

            $scope.Fetch();

            $scope.acls = [{
                label: 'Glasses',
                value: 'glasses',
                children: [{
                    label: 'Top Hat',
                    value: 'top_hat'
                }, {
                    label: 'Curly Mustache',
                    value: 'mustachio'
                }]
            }];
        });