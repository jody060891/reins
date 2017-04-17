angular.module('HITS').controller('DepartmentModalCtrl', function ($scope, DepartmentService, Departments, RoutingUser, $modalInstance, LoadingScreenService) {

    var data = {};
    data.Departments = Departments;
    if (!data.Departments) data.Departments = [];

    $scope.data = data;
    $scope.routingUser = RoutingUser;
    $scope.select = {};
    $scope.select.selectAllDepartment = false;
    $scope.select.unselectAllDepartment = false;
    var hash = {};
    angular.forEach($scope.data.Departments, function (department, k) {
        hash[department.department_id] = department;
    });

    LoadingScreenService.showLoading();
    var jsonResult = DepartmentService.FetchAll(function () {
        $scope.departments = jsonResult.data;

        angular.forEach($scope.departments, function (department, k) {
            if (!hash[department.department_id]) {
                data.Departments.push({
                    department_id: department.department_id,
                    is_active: false,
                    Department: department
                });
            }
        });

        LoadingScreenService.hideLoading();
    });

    $scope.select_all_department = function () {
        if (!$scope.select.selectAllDepartment) {
            $scope.select.selectAllDepartment = true;
            $scope.select.unselectAllDepartment = false;
        } else {
            $scope.select.selectAllDepartment = false;
            $scope.select.unselectAllDepartment = false;
        }
        angular.forEach($scope.data.Departments, function (department) {
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
            angular.forEach($scope.data.Departments, function (department) {
                department.is_active = false;

            });
        }
    };

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data.Departments);
    };

    //$scope.onSave = function (data) {
    //    $scope.validate.button = false;
    //    toggleAction();

    //    var departments = angular.copy($scope.data.Departments);
    //    $scope.data.Departments = [];

    //    angular.forEach(departments, function (department, k) {
    //        if (department.committee_department_id || department.is_active) {
    //            $scope.data.Departments.push(department);
    //        }
    //    });

    //    var result = DepartmentService.Save(data, function () {
    //        $modalInstance.close();

    //        toggleAction();
    //    });
    //};
});