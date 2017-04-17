angular.module('HITS')
    .controller('UserFormCtrl', function ($scope, $timeout, $modal, $modalInstance, UserService, UserRoleService, userData, InstitutionService, DepartmentService, EmployeeCategoryService, DesignationService, ToastMessageService, LoadingScreenService, RoleService, UserSessionData) {
        $scope.datePickerOpen = function (id) {
            $timeout(function () {
                $("#" + id).focus();
            });
        };
        $scope.isDateEnable = true;
        $scope.institution_id = UserSessionData.institution_id;

        $scope.syncRoleWithRoutingAndCommGroup = function(){
            angular.forEach($scope.user.UserRoles, function(userRole, k){
                if (!userRole.is_active){
                    angular.forEach($scope.user.CommitteeGroups, function(commGroup, k2){
                        if (commGroup.CommitteeGroup.role_id == userRole.role_id){
                            commGroup.is_active = false;
                        }
                    });
                    angular.forEach($scope.user.RoutingGroups, function(routingGroup, k3){
                        if (routingGroup.RoutingGroup.role_id == userRole.role_id){
                            routingGroup.is_active = false;
                        }
                    });
                }
            });
        };

        var openSearchUserModal = function (keyword) {
            $modal.open({
                templateUrl: 'app/master/user/search-user/search-user.html',
                controller: 'SearchUserCtrl',
                windowClass: 'modal-large',
                resolve: {
                    keywordData: function () {
                        return keyword;
                    }
                }
            }).result.then(function (result) {
                $scope.user = result;
                $scope.user.institution_id = $scope.institution_id;
            });
        };

        var openAddUserRoleModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/user/add-user-role/add-user-role.html',
                controller: 'AddUserRoleCtrl',
                resolve: {
                    userRolesData: function () {
                        return data;
                    },
                    userId: function () {
                        return $scope.user.user_id;
                    },
                    institutionId: function () {
                        return $scope.user.institution_id;
                    }
                }
            }).result.then(function (result) {
                angular.forEach(result, function (modRole, key){
                    var isExist = false;
                    angular.forEach($scope.user.UserRoles, function(curRole, k){
                        if (curRole.role_id == modRole.role_id){
                            curRole.is_active = modRole.is_active;
                            isExist = true;
                        }
                    });
                    if (!isExist){
                        if (!$scope.user.UserRoles)
                            $scope.user.UserRoles = [];
                        $scope.user.UserRoles.push(modRole);
                    }
                });

                //$scope.user.UserRoles = result;
                getHashRole($scope.user.UserRoles);
                $scope.syncRoleWithRoutingAndCommGroup();
            });
        };

        var openCommitteeGroupModal = function (data) {
            $modal.open({
                templateUrl: 'app/modal/committeeGroupModal/committee-group-modal.html',
                controller: 'CommitteeGroupModalCtrl',
                resolve: {
                    CommitteeGroups: function () {
                        return angular.copy(data.CommitteeGroups);
                    },
                    userRolesData: function () {
                        return data.UserRoles;
                    }
                }
            }).result.then(function (result) {
                angular.forEach(result, function (modCommGroup, key){
                    var isExist = false;
                    angular.forEach($scope.user.CommitteeGroups, function(curCommGroup, k){
                        if (curCommGroup.committee_group_id == modCommGroup.committee_group_id){
                            curCommGroup.is_active = modCommGroup.is_active;
                            isExist = true;
                        }
                    });
                    if (!isExist){
                        if (!$scope.user.CommitteeGroups)
                            $scope.user.CommitteeGroups = [];
                        $scope.user.CommitteeGroups.push(modCommGroup);
                    }
                });
                /*
                var committeeGroups = result;
                $scope.user.CommitteeGroups = [];

                angular.forEach(committeeGroups, function (committeeGroup, k) {
                    if (committeeGroup.committee_user_id || committeeGroup.is_active) {
                        committeeGroup.user_id = $scope.user.user_id;
                        $scope.user.CommitteeGroups.push(committeeGroup);
                    }
                });
                */
                //var autoRemove = false;
                //angular.forEach(committeeGroups, function (committeeGroup, k) {
                //    if ($scope.hashComm[committeeGroup.committee_group_id] && !committeeGroup.is_active) {
                //        var role_id = committeeGroup.CommitteeGroup.role_id;
                //        if (role_id && $scope.hashRole[role_id] && $scope.hashRole[role_id].is_active) {
                //            autoRemove = true;
                //        }
                //    }
                //});
                //
                //if (autoRemove) {
                //    var sel = confirm("There is a role tied to the unselected committee group, do you want to remove the role?");
                //    if (sel) {
                //        angular.forEach(committeeGroups, function (committeeGroup, k) {
                //            if ($scope.hashComm[committeeGroup.committee_group_id] && !committeeGroup.is_active) {
                //                var role_id = committeeGroup.CommitteeGroup.role_id;
                //                if (role_id && $scope.hashRole[role_id]) {
                //                    $scope.hashRole[role_id].is_active = false;
                //                }
                //            }
                //        });
                //    }
                //}
                //
                //angular.forEach(committeeGroups, function (committeeGroup, k) {
                //    if (committeeGroup.is_active) {
                //        var role_id = committeeGroup.CommitteeGroup.role_id;
                //        if (role_id) {
                //            if (!$scope.hashRole[role_id]) {
                //                var newRole = {
                //                    role_id: role_id,
                //                    user_id: $scope.user.user_id,
                //                    is_active: true,
                //                    institution_id: $scope.user.institution_id,
                //                    Role: $scope.hashCompleteRole[role_id]
                //                };
                //                $scope.user.UserRoles.push(newRole);
                //                $scope.hashRole[role_id] = newRole;
                //            } else {
                //                $scope.hashRole[role_id].is_active = true;
                //            }
                //        }
                //    }
                //});

                getHashRole($scope.user.UserRoles);
                getHashCommittee($scope.user.CommitteeGroups);
            });
        };

        var openRoutingGroupModal = function (data) {
            $modal.open({
                templateUrl: 'app/modal/routingGroupModal/routing-group-modal.html',
                controller: 'RoutingGroupModalCtrl',
                resolve: {
                    RoutingGroups: function () {
                        return angular.copy(data.RoutingGroups);
                    },
                    userRolesData: function(){
                        return data.UserRoles
                    }
                }
            }).result.then(function (result) {
                angular.forEach(result, function (modRoutingGroup, key){
                    var isExist = false;
                    angular.forEach($scope.user.RoutingGroups, function(curRoutingGroup, k){
                        if (curRoutingGroup.routing_group_id == modRoutingGroup.routing_group_id){
                            curRoutingGroup.is_active = modRoutingGroup.is_active;
                            isExist = true;
                        }
                    });
                    if (!isExist){
                        if (!$scope.user.RoutingGroups)
                            $scope.user.RoutingGroups = [];
                        $scope.user.RoutingGroups.push(modRoutingGroup);
                    }
                });
                /*
                var routingGroups = result;
                $scope.user.RoutingGroups = [];

                angular.forEach(routingGroups, function (routingGroup, k) {
                    if (routingGroup.routing_user_id || routingGroup.is_active) {
                        routingGroup.user_id = $scope.user.user_id;
                        $scope.user.RoutingGroups.push(routingGroup);
                    }
                });
                */
            });
        };

        var openLocationModal = function (data) {
            $modal.open({
                templateUrl: 'app/modal/locationModal/location-modal.html',
                controller: 'LocationModalCtrl',
                resolve: {
                    Locations: function () {
                        return angular.copy(data.RoutingLocations);
                    },
                    RoutingUser: function(){
                        return data;
                    }
                }
            }).result.then(function (result) {
                var locations = result;
                data.RoutingLocations = [];

                angular.forEach(locations, function (location, k) {
                    if (location.routing_location_id || location.is_active) {
                        location.routing_user_id = data.routing_user_id;
                        data.RoutingLocations.push(location);
                    }
                });
            });
        };

        var openDepartmentModal = function (data) {
            $modal.open({
                templateUrl: 'app/modal/departmentModal/department-modal.html',
                controller: 'DepartmentModalCtrl',
                resolve: {
                    Departments: function () {
                        return angular.copy(data.RoutingDepartments);
                    },
                    RoutingUser: function(){
                        return data;
                    }
                }
            }).result.then(function (result) {
                var departments = result;
                data.RoutingDepartments = [];

                angular.forEach(departments, function (department, k) {
                    if (department.routing_department_id || department.is_active) {
                        department.routing_user_id = data.routing_user_id;
                        data.RoutingDepartments.push(department);
                    }
                });
            });
        };

        $scope.user = userData;
        $scope.user.institution_id = $scope.institution_id;
        
        if (!$scope.user.CommitteeGroups) $scope.user.CommitteeGroups = [];

        var getHashCommittee = function (groups) {
            $scope.hashComm = {};
            angular.forEach(groups, function (comm, k) {
                if (comm.is_active) {
                    if (!$scope.hashComm[comm.committee_group_id]) $scope.hashComm[comm.committee_group_id] = comm;
                }
            });
        };
        getHashCommittee($scope.user.CommitteeGroups);


        if ($scope.user == null)
            $scope.tempUsername = null;
        else
            $scope.tempUsername = angular.copy($scope.user.user_name);

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

        $scope.validate = {};
        $scope.validate.button = true;

        if ($scope.user.name) {
            $scope.validate.name = false;
        }
        if ($scope.user.institution_id) {
            $scope.validate.institution_id = false;
        }
        if ($scope.user.adid) {
            $scope.validate.adid = false;
        }
        if ($scope.user.user_name) {
            $scope.validate.user_name = false;
        }
        if ($scope.user.email) {
            $scope.validate.email = false;
        }

        $scope.isValid = function () {
            if ($scope.user.name) {
                $scope.validate.name = false;
            } else {
                $scope.validate.name = true;
            }
            if ($scope.user.institution_id) {
                $scope.validate.institution_id = false;
            } else {
                $scope.validate.institution_id = true;
            }
            if ($scope.user.adid) {
                $scope.validate.adid = false;
            } else {
                $scope.validate.adid = true;
            }
            if ($scope.user.user_name) {
                $scope.validate.user_name = false;
            } else {
                $scope.validate.user_name = true;
            }
            if ($scope.user.email) {
                $scope.validate.email = false;
            } else {
                $scope.validate.email = true;
            }


            if (!$scope.validate.name && !$scope.validate.institution_id && !$scope.validate.adid && !$scope.validate.user_name && !$scope.validate.email) {
                return true;
            } else {
                return false;
            }
        };

        $scope.onSave = function (data) {
            if (!$scope.user.user_name) $scope.user.user_name = $scope.user.adid;
            if (!data.user_name) data.user_name = data.adid;
            if ($scope.isValid()) {
                $scope.validate.button = false;
                var userRoles = angular.copy(data.UserRoles);
                data.UserRoles = [];
                angular.forEach(userRoles, function (userRole, i) {
                    if (userRole.is_active || userRole.user_role_id > 0) {
                        data.UserRoles.push(userRole);
                    }
                });
                if (!data.default_landing_page) {
                    data.default_landing_page = '/incident/track';
                }

                LoadingScreenService.showLoading();
                var jsonResult = UserService.SaveForm(data, function () {
                    var result = jsonResult.data;
                    if (result.IsSuccess)
                        $modalInstance.close(result);
                    else {
                        ToastMessageService.removeAlerts();
                        ToastMessageService.addAlerts("danger", "Failed Saving Data. Error : " + result.Message);
                        $scope.validate.button = true;
                    }

                    LoadingScreenService.hideLoading();
                });
            }
        };

        $scope.onSearchUser = function (keyword) {
            openSearchUserModal(keyword);
        };

        var getHashRole = function (roles) {
            if (!$scope.hashRole) $scope.hashRole = {};
            angular.forEach(roles, function (role, k) {
                if (!$scope.hashRole[role.role_id]) $scope.hashRole[role.role_id] = role;
            });
        };

        $scope.FetchUserRoles = function (userId) {
            var jsonResult = UserRoleService.FetchAll({
                userId: userId
            }, function () {
                $scope.user.UserRoles = [];
                var dataUserRoles = jsonResult.data;
                $scope.user.UserRoles = dataUserRoles;

                getHashRole($scope.user.UserRoles);
            });
        };

        if ($scope.tempUsername != null)
            $scope.FetchUserRoles($scope.user.user_id);

        $scope.onDeleteRole = function (dataRole) {
            var index = $scope.user.UserRoles.indexOf(dataRole);
            $scope.user.UserRoles[index].is_active = false;
            $scope.syncRoleWithRoutingAndCommGroup();
        };

        $scope.onAddRole = function (dataRoles) {
            openAddUserRoleModal(dataRoles);
        };

        $scope.onAddCommitteeGroup = function (data) {
            openCommitteeGroupModal(data);
        };

        $scope.onAddRoutingGroup = function (data) {
            openRoutingGroupModal(data);
        };

        $scope.onAddLocation = function (data) {
            openLocationModal(data);
        };

        $scope.onAddDepartment = function (data) {
            openDepartmentModal(data);
        };


        var jsonResult = RoleService.FetchAll(function () {
            $scope.hashCompleteRole = {};
            var dataRoles = jsonResult.data;

            angular.forEach(dataRoles, function (role, i) {
                if (!$scope.hashCompleteRole[role.role_id]) $scope.hashCompleteRole[role.role_id] = role;
            });

        });

        $scope.onDeleteCommittee = function (committeeGroup) {
            committeeGroup.is_active = false;
            getHashCommittee($scope.user.CommitteeGroups);
        }
    });