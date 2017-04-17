angular.module('HITS')
    .controller('WorkflowformCtrl', function ($scope, workflow, WorkflowService, RoutingGroupService, $modalInstance, InstitutionService, EmployeeCategoryService) {

        $scope.workflow = workflow;
        var reorder = function () {
            if ($scope.workflow.Details) {
                angular.forEach($scope.workflow.Details, function (d, k) {
                    d.order = k + 1;
                    $scope.max = d.order;
                });
            }
        };

        reorder();

        var putInactiveLast = function () {
            $scope.workflow.Details.sort(function (a, b) {
                return !a.is_active && b.is_active;
            });
        };

        $scope.onDelete = function (detail) {
            detail.is_active = false;

            putInactiveLast();

            reorder();

            $scope.max--;
        };

        $scope.moveUp = function (data) {
            if (data.order > 1) {
                $scope.workflow.Details[data.order - 2].order++;
                data.order--;

                $scope.workflow.Details.sort(function (a, b) {
                    return a.order - b.order;
                });

                reorder();
            }
        };

        $scope.moveDown = function (data) {
            if (data.order < $scope.max) {
                $scope.workflow.Details[data.order].order--;
                data.order++;

                $scope.workflow.Details.sort(function (a, b) {
                    return a.order - b.order;
                });

                reorder();
            }
        };

        var rg = RoutingGroupService.FetchAll(function () {
            $scope.routingGroups = rg.data;
        });

        var ec = EmployeeCategoryService.FetchAll(function () {
            $scope.employeeCategories = ec.data;
        });

        $scope.addDetail = function (workflow) {
            workflow.Details.push({
                is_active: true
            });

            putInactiveLast();

            reorder();
        };

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.validate = {};
        $scope.validate.button = true;

        if ($scope.workflow.workflow_description) {
            $scope.validate.workflow_description = false;
        }

        $scope.isValid = function () {
            if ($scope.workflow.workflow_description) {
                $scope.validate.workflow_description = false;
            } else {
                $scope.validate.workflow_description = true;
            }
            $scope.validate.details = false;
            if ($scope.workflow.Details) {
                angular.forEach($scope.workflow.Details, function (d, k) {
                    if (!d.routing_group_id) {
                        $scope.validate.details = true;
                    }
                });
            }


            if (!$scope.validate.workflow_description && !$scope.validate.details) {
                return true;
            } else {
                return false;
            }
        };

        $scope.onSave = function (data) {
            if ($scope.isValid()) {
                $scope.validate.button = false;
                toggleAction();
                var result = WorkflowService.Save(data, function () {
                    $modalInstance.close(result.data.IsSuccess);

                    toggleAction();
                });
            }
        };
    });