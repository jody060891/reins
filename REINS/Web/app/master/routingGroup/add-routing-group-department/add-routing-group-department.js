angular.module('HITS')
    .controller('AddRoutingGroupDepartmentCtrl', function ($scope, DepartmentService, RoutingGroupService, routingUser, routingGroup, $modalInstance, LoadingScreenService) {
        $scope.routingUser = routingUser;
        $scope.routingGroup = routingGroup;
        $scope.select = {};
        $scope.select.selectAllDept = false;
        $scope.select.unselectAllDept = false;
        var hash = {};
        angular.forEach($scope.routingUser.RoutingDepartments, function (dept, k) {
            hash[dept.department_id] = dept;
        });

        $scope.validate = {};
        $scope.validate.button = true;

        var jsonResult = DepartmentService.FetchAll(function () {
            $scope.departments = jsonResult.data;

            $scope.tempRoutingDepartments = angular.copy($scope.routingUser.RoutingDepartments);
            if ($scope.tempRoutingDepartments == null)
                $scope.tempRoutingDepartments = [];

            angular.forEach($scope.departments, function (dept, k) {
                if (!hash[dept.department_id]) {
                    $scope.tempRoutingDepartments.push({
                        routing_user_id: $scope.routingUser.routing_user_id,
                        department_id: dept.department_id,
                        is_active: false,
                        Department: dept
                    });
                }
            });
        });

        $scope.select_all_dept = function () {
            if (!$scope.select.selectAllDept) {
                $scope.select.selectAllDept = true;
                $scope.select.unselectAllDept = false;
            } else {
                $scope.select.selectAllDept = false;
                $scope.select.unselectAllDept = false;
            }
            angular.forEach($scope.tempRoutingDepartments, function (dept) {
                dept.is_active = $scope.select.selectAllDept;

            });
        };

        $scope.unselect_all_dept = function () {
            if (!$scope.select.unselectAllLoc) {
                $scope.select.selectAllDept = false;
                $scope.select.unselectAllDept = true;
            } else {
                $scope.select.selectAllDept = false;
                $scope.select.unselectAllDept = false;
            }
            if ($scope.select.unselectAllDept) {
                angular.forEach($scope.tempRoutingDepartments, function (dept) {
                    dept.is_active = false;

                });
            }
        };

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        $scope.onSave = function (data) {
            $scope.validate.button = false;
            LoadingScreenService.showLoading();
            
            toggleAction();

            var departments = angular.copy($scope.tempRoutingDepartments);
            $scope.routingUser.RoutingDepartments = [];

            angular.forEach(departments, function (dept, k) {
                if (dept.routing_department_id || dept.is_active) {
                    $scope.routingUser.RoutingDepartments.push(dept);
                }
            });
            //var index = $scope.routingGroup.RoutingUsers.indexOf($scope.routingUser);
            //$scope.routingGroup.RoutingUsers[index] = $scope.routingUser;
            var index = -1;
            var i = 0;
            angular.forEach($scope.routingGroup.RoutingUsers, function(rUser, key){
                if (rUser.routing_user_id == $scope.routingUser.routing_user_id){
                    index = i;
                }
                i++;
            });
            if (index >= 0){
                $scope.routingGroup.RoutingUsers[index] = $scope.routingUser;
            }

            var jsonResult = RoutingGroupService.SaveUserRoutingDepartment({
                routingUserId: $scope.routingUser.routing_user_id,
                listDepartment: $scope.routingUser.RoutingDepartments,
                isAllDepartment: $scope.routingUser.is_all_department
            }, function () {
                toggleAction();
                LoadingScreenService.hideLoading();
                $modalInstance.close($scope.routingUser);
            }, function () {
                toggleAction();
                LoadingScreenService.hideLoading();
                $modalInstance.close(null);
                $scope.validate.button = true;
            });

            //var jsonResult = RoutingGroupService.Save($scope.routingGroup, function () {
            //    toggleAction();
            //    LoadingScreenService.hideLoading();
            //    $modalInstance.close($scope.routingUser);
            //}, function () {
            //    toggleAction();
            //    LoadingScreenService.hideLoading();
            //    $modalInstance.close(null);
            //    $scope.validate.button = true;
            //});

        };
    });