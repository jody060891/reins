angular.module('HITS')
    .controller('RoutinggroupformCtrl', function ($scope, routingGroup, RoutingGroupService, $modalInstance, InstitutionService, UserSessionData, RoleService) {

        $scope.routingGroup = routingGroup;
        $scope.routingGroup.institution_id = UserSessionData.institution_id;
        var jsonResult = InstitutionService.FetchAll(function () {
            $scope.institutions = jsonResult.data;
        });

        var jsonRoleResult = RoleService.FetchAll(function () {
            $scope.roles = jsonRoleResult.data;
        });

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.validate = {};
        $scope.validate.button = true;

        if ($scope.routingGroup.name) {
            $scope.validate.name = false;
        }

        if ($scope.routingGroup.status_description) {
            $scope.validate.status_description = false;
        }

        if ($scope.routingGroup.institution_id) {
            $scope.validate.institution_id = false;
        }

        $scope.isValid = function () {
            $scope.validate.name = !$scope.routingGroup.name;
            $scope.validate.institution_id = !$scope.routingGroup.institution_id;
            $scope.validate.status_description = !$scope.routingGroup.status_description;
            
            return !!(!$scope.validate.name && !$scope.validate.institution_id && !$scope.validate.status_description);
        };

        $scope.onSave = function (data) {
            if ($scope.isValid()) {
                $scope.validate.button = false;
                toggleAction();
                var result = RoutingGroupService.Save(data, function () {
                    $modalInstance.close();

                    toggleAction();
                });
            }
        };

    });