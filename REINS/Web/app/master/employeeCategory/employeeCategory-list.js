angular.module('HITS')
    .controller('EmployeeCategoryListCtrl',
    function EmployeeCategoryListCtrl($rootScope, $scope, $resource, $location, $modal, EmployeeCategoryService,
        ToastMessageService, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_MASTER_DATA_EMPLOYEE_CATEGORY_VIEW']){
            $location.path('/unauthorized');
        }

        var openModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/employeeCategory/employeeCategory-form/employeeCategory-form.html',
                controller: 'EmployeeCategoryFormCtrl',
                resolve: {
                    employeeCategoryData: function () {
                        return data;
                    }
                }
            }).result.then(function (result) {
                // ToastMessageService.addAlerts('Test');
                $scope.Fetch();
            });
        };

        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'employee_category_code',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword,
                fields: ['employee_category_description', 'employee_category_code']
            }
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = EmployeeCategoryService.FetchAllWithPagination($scope.SearchQuery, function () {
                $scope.employeeCategorys = [];
                var data_employeeCategorys = jsonResult.data.list;
                var i = 0;
                $scope.employeeCategorys = data_employeeCategorys;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;


                //$rootScope.hideLoading();
            });
        };

        $scope.onCreateNew = function () {

            openModal({});
        };

        $scope.onRowEdit = function (employeeCategoryData) {

            openModal(angular.copy(employeeCategoryData));
        };

        $scope.onRowDelete = function (employeeCategoryData) {
            var sel = confirm("Are you sure you want to delete the Employee Category [" + employeeCategoryData.employee_category_description + "] ?");
            if (sel) {
                var jsonResult = EmployeeCategoryService.Delete(employeeCategoryData, function () {
                    $scope.Fetch();
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
