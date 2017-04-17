angular.module('HITS')
    .controller('AddUserRoleCtrl', function ($scope, $modalInstance, userRolesData, userId, institutionId, RoleService) {
        $scope.userRoles = userRolesData;

        $scope.dataTemplate = {
            user_role_id: 0,
            user_id: userId,
            institution_id: institutionId,
            role_id: 0,
            is_active: false,
            User: null,
            Institution: null,
            Role: {
                role_id: 0,
                role_name: "",
                institution_id: institutionId,
                Institution: null,
                RoleAcl: null
            }
        };

        $scope.Fetch = function () {
            var jsonResult = RoleService.FetchAll(function () {
                $scope.roles = [];
                var dataRoles = jsonResult.data;

                angular.forEach(dataRoles, function (role, i) {
                    var data = angular.copy($scope.dataTemplate);

                    data.role_id = role.role_id;
                    data.Role = angular.copy(role);
                    role.is_selected = false;

                    angular.forEach($scope.userRoles, function (userRole, j) {
                        if (data.role_id == userRole.role_id) {
                            data.user_role_id = userRole.user_role_id;
                            data.is_active = userRole.is_active;
                        }
                    });
                    $scope.roles.push(data);
                });
                
            });
        };

        $scope.Fetch();

        $scope.validate = {};
        $scope.validate.button = true;

        $scope.onSaveRole = function () {
            $scope.validate.button = false;
            //$scope.savedRoles = angular.copy($scope.userRoles);
            $scope.savedRoles = [];
            angular.forEach($scope.roles, function(role, i) {
                if (role.is_selected || role.is_active) {
                    role.is_active = true;
                    $scope.savedRoles.push(role);
                }
            });

            $modalInstance.close($scope.savedRoles);
        };

    });