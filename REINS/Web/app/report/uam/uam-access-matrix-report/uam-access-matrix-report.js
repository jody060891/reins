angular.module('HITS')
    .controller('UamAccessMatrixReportCtrl', function($scope, $timeout, UserAccessMatrixReportService, $filter, RoleService, $window, $location, SessionService){
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['UAM_ACCESS_MATRIX_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {
            Roles: []
        };

        $scope.validation = {};

        $scope.pdfLink = "";
        //$scope.datePickerOpen = function (id) {
        //    $timeout(function () {
        //        $("#" + id).focus();
        //    });
        //};

        $scope.selectAll = function (list, con) {
            angular.forEach(list, function (l, k) {
                l.is_selected = con;
            });
        };

        $scope.select = function (list, hash, con) {
            angular.forEach(list, function (l, k) {
                if (hash[l]) {
                    hash[l].is_selected = con;
                }
            });
        };

        var jsonRoleResult = RoleService.FetchAll(function () {
            $scope.roles = jsonRoleResult.data;

            $scope.hashRole = {};
            angular.forEach($scope.roles, function (role, k) {
                $scope.hashRole[role.role_id] = role;
            });
        });

        $scope.onGenerateXls = function (type) {
            $scope.first = true;

            var valid = true;
            $scope.pdfLink = "";
            if (valid) {
                $scope.action = true;

                $scope.param.Roles = [];
                angular.forEach($scope.roles, function (role, key) {
                    if (role.is_selected) {
                        $scope.param.Roles.push(role);
                    }
                });

                if (type == 'Xls') {
                    var jsonResult = UserAccessMatrixReportService.GenerateXls($scope.param, function () {
                        var filename = jsonResult.data;
                        $window.location.assign("/File/DownloadXls?name=" + encodeURIComponent(filename));

                        $scope.action = false;
                    });
                }
                else {
                    var jsonResult = UserAccessMatrixReportService.GeneratePdf($scope.param, function () {
                        var filename = jsonResult.data;
                        $window.location.assign("/File/DownloadPdf?name=" + encodeURIComponent(filename));

                        $scope.action = false;
                    });
                }
            }
            //var result = SacScoreReportService.GeneratePdf($scope.param, function(){
            //
            //});
        };

        $scope.someSelected = function (object) {
            if (!object) return false;

            return Object.keys(object).some(function (key) {
                return object[key];
            });
        };

    });