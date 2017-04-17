angular.module('HITS')
    .controller('UserEditFormCtrl', function UserEditFormCtrl($scope, AuthenticationService, UserService, SessionService, UserRoleService, InstitutionService, DepartmentService, EmployeeCategoryService, DesignationService, ToastMessageService) {
        var jsonResultUser = AuthenticationService.GetCurrentUser(function () {
            $scope.user = jsonResultUser.data;
        });
        $scope.isDisabled = true;
        $scope.enabledSaveButton = function () {
            $scope.isDisabled = false;
        };

        if ($scope.user == null) {
            $scope.tempUsername = null;
        }
        else {
            $scope.tempUsername = angular.copy($scope.user.user_name);
        }

        var jsonResultInstitution = InstitutionService.FetchAll(function () {
            $scope.institutions = jsonResultInstitution.data;
        });

        var jsonResultDepartment = DepartmentService.FetchAll(function () {
            $scope.departments = jsonResultDepartment.data;
        });

        var jsonResultEmployeeCategory = EmployeeCategoryService.FetchAll(function () {
            $scope.employeeCategories = jsonResultEmployeeCategory.data;
        });

        var jsonResultDesignation = DesignationService.FetchAll(function () {
            $scope.designations = jsonResultDesignation.data;
        });

        $scope.onSave = function (data) {
            var userRoles = angular.copy(data.UserRoles);
            data.UserRoles = [];
            angular.forEach(userRoles, function (userRole, i) {
                if (userRole.is_active || userRole.user_role_id > 0) {
                    data.UserRoles.push(userRole);
                }
            });
            if (!data.default_landing_page){
                data.default_landing_page = '/incident/track';
            }

            var jsonResult = UserService.Save(data, function () {
                var result = jsonResult.data;
                if (result.IsSuccess) {
                    
                    SessionService.setSession(data);
                    ToastMessageService.addAlerts("success", "Data Saved Succesfully");
                    $scope.isDisabled = true;
                }
                else {
                    ToastMessageService.removeAlerts();
                    ToastMessageService.addAlerts("danger", "Failed Saving Data. Error : " + result.Message);
                }
            });
        };

        $scope.onSearchUser = function() {
            openSearchUserModal({});
        };

        $scope.FetchUserRoles = function(userId) {
            var jsonResult = UserRoleService.FetchAll({
                userId : userId
            }, function() {
                $scope.user.UserRoles = [];
                var dataUserRoles = jsonResult.data;
                $scope.user.UserRoles = dataUserRoles;
            });
        };

        if ($scope.tempUsername != null)
            $scope.FetchUserRoles($scope.user.user_id);

        $scope.onDeleteRole = function(dataRole) {
            var index = $scope.user.UserRoles.indexOf(dataRole);
            $scope.user.UserRoles[index].is_active = false;
        };

        $scope.onAddRole = function(dataRoles) {
            openAddUserRoleModal(dataRoles);
        };
    });