angular.module('HITS').controller('WorkflowCtrl', function ($scope, $modal, $location, WorkflowService,
    ToastMessageService, SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    if (!$scope.currentAcl['SM_WORKFLOW_VIEW']){
        $location.path('/unauthorized');
    }
    var openModal = function (data) {
        $modal.open({
            templateUrl: 'app/master/workflow/workflowForm/workflowForm.html',
            controller: 'WorkflowformCtrl',
            resolve: {
                workflow: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            if (result) {
                ToastMessageService.removeAlerts();
                ToastMessageService.addAlerts("success", "Save workflow success");
            } else {
                ToastMessageService.removeAlerts();
                ToastMessageService.addAlerts("danger", "Save workflow failed");
            }
            $scope.Fetch();
        });
    };

    $scope.openEmployeeCategoryForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/workflow/workflowEmployeeForm/workflowEmployeeForm.html',
            controller: 'WorkflowemployeeformCtrl',
            resolve: {
                workflow: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openDepartmentForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/workflow/workflowDepartmentForm/workflowDepartmentForm.html',
            controller: 'WorkflowDepartmentFormCtrl',
            resolve: {
                workflow: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openLocationForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/workflow/workflowLocationForm/workflowLocationForm.html',
            controller: 'WorkflowLocationFormCtrl',
            resolve: {
                workflow: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.onCreateNew = function () {
        openModal({
            Details: [
                {
                    is_active: true
                }
            ]
        });
    };

    $scope.onRowEdit = function (data) {
        openModal(angular.copy(data));
    };

    $scope.onRowDelete = function (data) {
        var sel = confirm("Are you sure you want to delete the Workflow [" + data.name + "] ?");
        if (sel) {
            var jsonResult = WorkflowService.Delete(data, function () {
                $scope.Fetch();
            });
        }
    };

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.save = function () {
        toggleAction();
        var result = WorkflowService.SaveList($scope.workflows, function () {
            toggleAction();
            $scope.Fetch();
        });
    };

    $scope.moveUp = function (data) {
        if (data.order > 1) {
            $scope.workflows[data.order - 2].order++;
            data.order--;

            $scope.save();
        }
    };

    $scope.moveDown = function (data) {
        if (data.order < $scope.workflows.length) {
            $scope.workflows[data.order].order--;
            data.order++;


            $scope.save();
        }
    };
    $scope.SearchQuery = {
        page: 1,
        row_per_page: 10,
        sort_by: 'workflow_description',
        is_sort_asc: true,
        total_data: 0,
        search: {
            keyword: $scope.keyword,
            fields: ['workflow_description']
        }
    };
    $scope.Fetch = function () {
        $scope.SearchQuery.search.keyword = $scope.keyword;
        var jsonResult = WorkflowService.FetchAllWithPagination($scope.SearchQuery, function () {
            $scope.workflows = jsonResult.data.list;
            $scope.SearchQuery.total_data = jsonResult.data.totalData;

        });
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

    var openManageEmployeeDesignationForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/workflow/manage-employee-designation/manage-employee-designation.html',
            controller: 'ManageEmployeeDesignationCtrl',
            windowClass: 'modal-large',
            resolve: {
                workflowEmployee: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            if (result.IsSuccess){
                ToastMessageService.removeAlerts();
                ToastMessageService.addAlerts("success","Data Saved Successfully");
            }
            else {
                ToastMessageService.removeAlerts();
                ToastMessageService.addAlerts("danger","Failed to Save data. Error : " + result.Message);
            }
        });
    };

    $scope.onManageDesignation = function(data){
        openManageEmployeeDesignationForm(data);
    }

});