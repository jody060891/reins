angular.module('HITS')
    .controller('DesignationListCtrl',
        function DesignationListCtrl($rootScope, $scope, $resource, $location, $modal, DesignationService,
            ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
            var openModal = function (data) {
                $modal.open({
                    templateUrl: 'app/master/designation/designation-form/designation-form.html',
                    controller: 'DesignationFormCtrl',
                    resolve: {
                        designationData: function () {
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
                        message = "Save designation failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                    $scope.Fetch();
                });
            };

            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'designation_description',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['designation_description', 'EmployeeCategory.employee_category_description', 'DesignationGroup.designation_group_name']
                }
            };

            $scope.Fetch = function () {
                $scope.SearchQuery.search.keyword = $scope.keyword;
                var jsonResult = DesignationService.FetchAllWithPagination($scope.SearchQuery, function () {
                    $scope.designations = [];
                    var data_designations = jsonResult.data.list;
                    var i = 0;
                    $scope.designations = data_designations;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                    ToastMessageService.removeAlerts();
                    //$rootScope.hideLoading();
                });
            };

            $scope.onCreateNew = function () {
             
                openModal({});
                ToastMessageService.removeAlerts();
            };

            $scope.onRowEdit = function (designationData) {
             
                openModal(angular.copy(designationData));
                ToastMessageService.removeAlerts();
            };

            $scope.onRowDelete = function (designationData) {
                var sel = confirm("Are you sure you want to delete the Designation [" + designationData.designation_description + "] ?");
                if (sel) {
                    var jsonResult = DesignationService.Delete(designationData, function () {
                        if (jsonResult.data.IsSuccess) {
                            ToastMessageService.addAlerts('success', jsonResult.data.Message);
                            $scope.Fetch();
                        } else {
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts('danger', 'Delete designation failed');
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
