angular.module('HITS')
    .controller('CommitteeEmpCategoryFormCtrl', function ($scope, EmployeeCategoryService, committeeGroup, CommitteeGroupService, $modalInstance) {

        if (!committeeGroup.EmployeeCategories) committeeGroup.EmployeeCategories = [];

        $scope.committeeGroup = committeeGroup;
        $scope.select = {};
        $scope.select.selectAllEmpCat = false;
        $scope.select.unselectAllEmpCat = false;
        var hash = {};
        angular.forEach($scope.committeeGroup.EmployeeCategories, function (empCat, k) {
            hash[empCat.employee_category_id] = empCat;
        });

        var jsonResult = EmployeeCategoryService.FetchAll(function () {
            $scope.employeeCategories = jsonResult.data;

            angular.forEach($scope.employeeCategories, function (empCat, k) {
                if (!hash[empCat.employee_category_id]) {
                    committeeGroup.EmployeeCategories.push({
                        committee_group_id: committeeGroup.committee_group_id,
                        employee_category_id: empCat.employee_category_id,
                        is_active: false,
                        EmployeeCategory: empCat
                    });
                }
            });
        });

        $scope.selectAllEmpCat = function () {
            if (!$scope.select.selectAllEmpCat) {
                $scope.select.selectAllEmpCat = true;
                $scope.select.unselectAllEmpCat = false;
            } else {
                $scope.select.selectAllEmpCat = false;
                $scope.select.unselectAllEmpCat = false;
            }
            angular.forEach($scope.committeeGroup.EmployeeCategories, function (empCat) {
                empCat.is_active = $scope.select.selectAllEmpCat;

            });
        };

        $scope.unselectAllEmpCat = function () {
            if (!$scope.select.unselectAllDiscipline) {
                $scope.select.selectAllEmpCat = false;
                $scope.select.unselectAllEmpCat = true;
            } else {
                $scope.select.selectAllEmpCat = false;
                $scope.select.unselectAllEmpCat = false;
            }
            if ($scope.select.unselectAllEmpCat) {
                angular.forEach($scope.committeeGroup.EmployeeCategories, function (empCat) {
                    empCat.is_active = false;

                });
            }
        };

        $scope.validate = {};
        $scope.validate.button = true;

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSubmit = function (data) {
            $modalInstance.close(data);
        };

        $scope.onSave = function (data) {
            $scope.validate.button = false;
            toggleAction();

            var empCats = angular.copy($scope.committeeGroup.EmployeeCategories);
            $scope.committeeGroup.EmployeeCategories = [];

            angular.forEach(empCats, function (empCat, k) {
                if (empCat.employee_category_id || empCat.is_active) {
                    $scope.committeeGroup.EmployeeCategories.push(empCat);
                }
            });

            var result = CommitteeGroupService.Save(data, function () {
                $modalInstance.close();

                toggleAction();
            });
        };
    });