angular.module('HITS')
    .controller('ManageEmployeeDesignationCtrl', function ($scope, DesignationService, workflowEmployee, WorkflowEmployeeService, $modalInstance) {
        $scope.select = {};
        $scope.select.selectAll = false;
        $scope.select.unselectAll = false;

        $scope.fetch = function (){
            var workflowEmployeeId = workflowEmployee.workflow_employee_id;
            var jsonFetchResult = WorkflowEmployeeService.Fetch({
                workflowEmployeeId: workflowEmployeeId
            }, function(){
                $scope.workflow = jsonFetchResult.data;
                var hash = {};
                angular.forEach($scope.workflow.EmployeeDesignations, function (employeeDesignation, k) {
                    hash[employeeDesignation.designation_id] = employeeDesignation;
                });
                var jsonResult = DesignationService.FetchAllByEmployeeCategoryId({employeeCategoryId: workflowEmployee.employee_category_id},function () {
                    $scope.employeeDesignations = jsonResult.data;

                    angular.forEach($scope.employeeDesignations, function (employeeDesignation, k) {
                        if (!hash[employeeDesignation.designation_id]) {
                            $scope.workflow.EmployeeDesignations.push({
                                workflow_employee_id: $scope.workflow.workflow_employee_id,
                                designation_id: employeeDesignation.designation_id,
                                is_active: false,
                                Designation: employeeDesignation
                            });
                        }
                    });
                });

            })
        };
        $scope.fetch();

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSave = function (data) {
            toggleAction();

            var employeeDesignations = angular.copy($scope.workflow.EmployeeDesignations);
            $scope.workflow.EmployeeDesignations = [];

            angular.forEach(employeeDesignations, function (employeeDesignation, k) {
                if (employeeDesignation.workflow_employee_designation_id || employeeDesignation.is_active) {
                    $scope.workflow.EmployeeDesignations.push(employeeDesignation);
                }
            });

            var result = WorkflowEmployeeService.Save(data, function () {
                $modalInstance.close(result.data);
                toggleAction();
            });
        };

        $scope.onSelectAll = function(){
            if (!$scope.select.selectAll) {
                $scope.select.selectAll = true;
                $scope.select.unselectAll = false;
            } else {
                $scope.select.selectAll = false;
                $scope.select.unselectAll = false;
            }
            angular.forEach($scope.workflow.EmployeeDesignations, function (data) {
                data.is_active = $scope.select.selectAll;
            });
        };

        $scope.onUnselectAll = function(){
            if (!$scope.select.unselectAll) {
                $scope.select.selectAll = false;
                $scope.select.unselectAll = true;
            } else {
                $scope.select.selectAll = false;
                $scope.select.unselectAll = false;
            }
            if ($scope.select.unselectAll) {
                angular.forEach($scope.workflow.EmployeeDesignations, function (data) {
                    data.is_active = false;
                });
            }
        };
    });