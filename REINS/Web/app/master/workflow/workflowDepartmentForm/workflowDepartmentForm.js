angular.module('HITS').controller('WorkflowDepartmentFormCtrl', function ($scope, DepartmentService, workflow, WorkflowService, $modalInstance) {

    $scope.workflow = angular.copy(workflow);
    $scope.select = {};
    $scope.select.selectAllDepartment = false;
    $scope.select.unselectAllDepartment = false;
    var hash = {};
    angular.forEach($scope.workflow.Departments, function (department, k) {
        hash[department.department_id] = department;
    });

    var jsonResult = DepartmentService.FetchAll(function () {
        $scope.departments = jsonResult.data;
        angular.forEach($scope.departments, function (department, k) {
            if (!hash[department.department_id]) {
                $scope.workflow.Departments.push({
                    workflow_id: workflow.workflow_id,
                    department_id: department.department_id,
                    is_active: false,
                    Department: department
                });
            }
        });
    });

    $scope.select_all_department = function () {
        if (!$scope.select.selectAllDepartment) {
            $scope.select.selectAllDepartment = true;
            $scope.select.unselectAllDepartment = false;
        } else {
            $scope.select.selectAllDepartment = false;
            $scope.select.unselectAllDepartment = false;
        }
        angular.forEach($scope.workflow.Departments, function (department) {
            department.is_active = $scope.select.selectAllDepartment;
        });
    };

    $scope.unselect_all_department = function () {
        if (!$scope.select.unselectAllDepartment) {
            $scope.select.selectAllDepartment = false;
            $scope.select.unselectAllDepartment = true;
        } else {
            $scope.select.selectAllDepartment = false;
            $scope.select.unselectAllDepartment = false;
        }
        if ($scope.select.unselectAllDepartment) {
            angular.forEach($scope.workflow.Departments, function (department) {
                department.is_active = false;

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

        var departments = angular.copy($scope.workflow.Departments);
        $scope.workflow.Departments = [];

        angular.forEach(departments, function (department, k) {
            if (department.workflow_department_id || department.is_active) {
                $scope.workflow.Departments.push(department);
            }
        });

        var result = WorkflowService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});