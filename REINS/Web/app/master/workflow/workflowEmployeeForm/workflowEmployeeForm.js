angular.module('HITS').controller('WorkflowemployeeformCtrl', function ($scope, EmployeeCategoryService, workflow, WorkflowService, $modalInstance) {

    
    $scope.workflow = angular.copy(workflow);
    $scope.select = {};
    $scope.select.selectAllEmployee = false;
    $scope.select.unselectAllEmployee = false;
    var hash = {};
    angular.forEach($scope.workflow.Employees, function (employeeCategory, k) {
        hash[employeeCategory.employee_category_id] = employeeCategory;
    });

    var jsonResult = EmployeeCategoryService.FetchAll(function () {
        $scope.employeeCategorys = jsonResult.data;

        angular.forEach($scope.employeeCategorys, function (employeeCategory, k) {
            if (!hash[employeeCategory.employee_category_id]) {
                $scope.workflow.Employees.push({
                    workflow_id: workflow.workflow_id,
                    employee_category_id: employeeCategory.employee_category_id,
                    is_active: false,
                    EmployeeCategory: employeeCategory
                });
            }
        });
    });

    $scope.select_all_employee = function () {
        if (!$scope.select.selectAllEmployee) {
            $scope.select.selectAllEmployee = true;
            $scope.select.unselectAllEmployee = false;
        } else {
            $scope.select.selectAllEmployee = false;
            $scope.select.unselectAllEmployee = false;
        }
        angular.forEach($scope.workflow.Employees, function (employeeCategory) {
            employeeCategory.is_active = $scope.select.selectAllEmployee;
        });
    };

    $scope.unselect_all_employee = function () {
        if (!$scope.select.unselectAllEmployee) {
            $scope.select.selectAllEmployee = false;
            $scope.select.unselectAllEmployee = true;
        } else {
            $scope.select.selectAllEmployee = false;
            $scope.select.unselectAllEmployee = false;
        }
        if ($scope.select.unselectAllEmployee) {
            angular.forEach($scope.workflow.Employees, function (employeeCategory) {
                employeeCategory.is_active = false;

            });
        }
    };

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {    
        $scope.action = !$scope.action;
    };

    $scope.onSave = function (data) {
        $scope.validate.button = false;
        toggleAction();

        var employeeCategorys = angular.copy($scope.workflow.Employees);
        $scope.workflow.Employees = [];

        angular.forEach(employeeCategorys, function (employeeCategory, k) {
            if (employeeCategory.workflow_employee_id || employeeCategory.is_active) {
                $scope.workflow.Employees.push(employeeCategory);
            }
        });

        var result = WorkflowService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});