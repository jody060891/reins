angular.module('HITS')
    .controller('UserListCtrl', function ($scope, $modal, $location, ToastMessageService, UserService, SessionService, UserAclSessionData, UserSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_USER_MANAGEMENT_USER_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.usertab = 1;

        $scope.onTabChanged = function() {
            if ($scope.usertab == 1) {
                $scope.Fetch();
            } else {
                $scope.FetchDeleted();
            }
        };

        $scope.keyword = {};
        var openModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/user/user-form/user-form.html',
                controller: 'UserFormCtrl',
                backdrop: 'static',
                windowClass: 'modal-fullscreen',
                resolve: {
                    userData: function () {
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
                    message = "Save user failed";
                }
                ToastMessageService.addAlerts(messageType, message);
                $scope.Fetch();
            });
        };
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keyword,
                fields: ['name', 'user_name', 'MasterInstitution.institution_description', 'gender', 'email', 'adid']
            }
        };

        $scope.Fetch = function () {
	    $scope.SearchQuery.search.keyword = $scope.keyword.keyword;
            var jsonResult = UserService.FetchAllWithPagination({
                searchQuery: $scope.SearchQuery,
                institutionId: UserSessionData.institution_id
	    }, function () {
                $scope.users = [];
                var dataUsers = jsonResult.data.list;
                $scope.users = dataUsers;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;

            });
        };

        $scope.onCreateNew = function () {
            openModal({});
        };

        $scope.onRowEdit = function (data) {
            openModal(angular.copy(data));
        };

        $scope.onRowDelete = function (data) {
            var sel = confirm("Are you sure you want to delete the User [" + data.user_name + "] ?");
            if (sel) {
                var jsonResult = UserService.Delete(data, function () {
                    var messageType = "", message = "";
                    if (jsonResult) {
                        messageType = "success";
                        message = "Data Deleted Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Delete user failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                    $scope.FetchDeleted();
                });
            }
        };


        $scope.onSearch = function () {
            $scope.Fetch();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
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

        $scope.SearchQueryDeleted = {
            page: 1,
            row_per_page: 10,
            sort_by: 'name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.deletedKeyword,
                fields: ['name', 'user_name', 'MasterInstitution.institution_description', 'gender', 'email', 'adid']
            }
        };

        $scope.FetchDeleted = function () {
           
                $scope.SearchQueryDeleted.search.keyword = $scope.keyword.deletedKeyword;
                var jsonResult = UserService.FetchAllDeletedWithPagination({
                    searchQuery: $scope.SearchQuery,
                    institutionId: UserSessionData.institution_id
                }, function () {
                    $scope.DeletedUsers = [];
                    var dataDeletedUsers = jsonResult.data.list;
                    $scope.DeletedUsers = dataDeletedUsers;
                    $scope.SearchQueryDeleted.total_data = jsonResult.data.totalData;
                });
           
        };

        $scope.onRowUnDelete = function (data) {
            var sel = confirm("Are you sure you want to restore the User [" + data.user_name + "] ?");
            if (sel) {
                var jsonResult = UserService.UnDelete(data, function () {
                    var messageType = "", message = "";
                    if (jsonResult) {
                        messageType = "success";
                        message = "Data Restored Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Error Restoring Data";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.FetchDeleted();
                    $scope.Fetch();
                });
            }
        };


        $scope.onSearchDeleted = function () {
            $scope.FetchDeleted();
        };

        $scope.onKeyPressDeleted = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearchDeleted();
            }
        };

        $scope.onPageDeletedChanged = function (page) {
            $scope.SearchQueryDeleted.page = page;

            $scope.FetchDeleted();
        };

        $scope.onSortDeleted = function (sortField) {
            if ($scope.SearchQueryDeleted.sort_by == sortField)
                $scope.SearchQueryDeleted.is_sort_asc = !$scope.SearchQueryDeleted.is_sort_asc;
            else
                $scope.SearchQueryDeleted.is_sort_asc = true;
            $scope.SearchQueryDeleted.sort_by = sortField;
            $scope.FetchDeleted();
        };

        $scope.FetchDeleted();
    });