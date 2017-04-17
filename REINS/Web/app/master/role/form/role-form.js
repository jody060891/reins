angular.module('HITS')
    .controller('RoleFormCtrl',
        function RoleFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, RoleService, RoleAclService, roleData) {
            
            $scope.role = roleData;

            $scope.validate = {};
            $scope.validate.button = true;

            if ($scope.role && $scope.role.role_name) {
                $scope.validate.role_name = false;
            }

            $scope.isValid = function () {
                if ($scope.role.role_name) {
                    $scope.validate.role_name = false;
                } else {
                    $scope.validate.role_name = true;
                }


                if (!$scope.validate.role_name) {
                    return true;
                } else {
                    return false;
                }
            }
            $scope.onSave = function (role) {
                
                if ($scope.isValid()) {
                    $scope.validate.button = false;
                    if (role.institution_id == null || role.institution_id === 0)
                        role.institution_id = 1;

                    role.Children = [];
                    role.Children.push($scope.acls);
                    var jsonResult = RoleService.Save(role, function () {
                        var result = true;
                        $modalInstance.close(result);
                    });
                }
            };

            $scope.FetchAcl = function () {
                var roleId = 0, institutionId = 1;
                if ($scope.role.role_id != null) {
                    roleId = $scope.role.role_id;
                    institutionId = $scope.role.institution_id;
                }
                var jsonResult = RoleAclService.FetchAll({
                    roleId: roleId,
                    institutionId: institutionId
                }, function() {
                    $scope.acls = [];
                    var data = jsonResult.data;
                    $scope.acls = data;
                });
            };
        

            $scope.FetchAcl();

            
        })
    .config(
        function (ivhTreeviewOptionsProvider) {
            ivhTreeviewOptionsProvider.set({
                twistieCollapsedTpl: '<span class="fa fa-plus-square"></span>',
                twistieExpandedTpl: '<span class="fa fa-minus-square"></span>',
                twistieLeafTpl: '<span class="fa fa-list-alt"></span>'
            });
    });