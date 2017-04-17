angular.module('HITS').controller('CommitteedepartmentformCtrl', function ($scope, DepartmentService, committeeGroup, CommitteeGroupService, $modalInstance) {

    if (!committeeGroup.Departments) committeeGroup.Departments = [];

    $scope.committeeGroup = committeeGroup;
    $scope.select = {};
    $scope.select.selectAllDepartment = false;
    $scope.select.unselectAllDepartment = false;
    var hash = {};
    angular.forEach($scope.committeeGroup.Departments, function (department, k) {
        hash[department.department_id] = department;
    });

    var jsonResult = DepartmentService.FetchAll(function () {
        $scope.departments = jsonResult.data;

        angular.forEach($scope.departments, function (department, k) {
            if (!hash[department.department_id]) {
                committeeGroup.Departments.push({
                    committee_group_id: committeeGroup.committee_group_id,
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
        angular.forEach($scope.committeeGroup.Departments, function (department) {
            department.is_active = $scope.select.selectAllDepartment;

        });
    }

    $scope.unselect_all_department = function () {
        if (!$scope.select.unselectAllDepartment) {
            $scope.select.selectAllDepartment = false;
            $scope.select.unselectAllDepartment = true;
        } else {
            $scope.select.selectAllDepartment = false;
            $scope.select.unselectAllDepartment = false;
        }
        if ($scope.select.unselectAllDepartment) {
            angular.forEach($scope.committeeGroup.Departments, function (department) {
                department.is_active = false;

            });
        }
    }

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data);
    }

    $scope.onSave = function (data) {
        $scope.validate.button = false;
        toggleAction();

        var departments = angular.copy($scope.committeeGroup.Departments);
        $scope.committeeGroup.Departments = [];

        angular.forEach(departments, function (department, k) {
            if (department.committee_department_id || department.is_active) {
                $scope.committeeGroup.Departments.push(department);
            }
        });

        var result = CommitteeGroupService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});