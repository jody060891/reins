angular.module('HITS')
    .controller('UamReportCtrl', function ($scope, $timeout, UserListingReportService, UserAccessMatrixReportService, $filter, RoleService, $window,
        $location, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['UAM_USER_LISTING_REPORT_VIEW'] && !scope.currentAcl['UAM_ACCESS_MATRIX_REPORT_VIEW']) {
            $location.path('/unauthorized');
        }
        $scope.param = {
            Roles: []
        };

        $scope.ReportService = null;

        if ($scope.currentAcl['UAM_USER_LISTING_REPORT_VIEW']) {
            $scope.report_type = 1;
            $scope.ReportService = UserAccessMatrixReportService;
        } else {
            $scope.report_type = 2;
            $scope.ReportService = UserListingReportService;
        }

        $scope.onReportTypeChanged = function() {
            if ($scope.report_type == 1) {
                $scope.ReportService = UserAccessMatrixReportService;
                angular.forEach($scope.roles, function (role, k) {
                    role.is_hidden = false;
                });
            }
            else if ($scope.report_type == 2) {
                $scope.ReportService = UserListingReportService;
                angular.forEach($scope.roles, function (role, k) {
                    if (role.role_name == "REPORTER" || role.role_name == "GUEST" ||
                        role.role_name == "ANONYMOUS REPORTER" || role.role_name == "ADDITIONAL CC") {
                        role.is_hidden = true;
                        role.is_selected = false;
                    }
                });
            }
        };

        $scope.validation = {};
        $scope.validation.role = false;
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
                role.is_hidden = false;
            });
        });

        $scope.isValid = function () {
            $scope.validation.role = false;
            var valid = false;
            angular.forEach($scope.roles, function (role, key) {
                if (role.is_selected) {
                    valid = true;
                }
            });
            if (!valid)
                $scope.validation.role = true;
            return valid;
        };

        $scope.onGenerateXls = function (type) {
            $scope.first = true;

            var valid = true;
            $scope.pdfLink = "";
            if ($scope.isValid()) {
                $scope.action = true;

                $scope.param.Roles = [];
                angular.forEach($scope.roles, function (role, key) {
                    if (role.is_selected && !role.is_hidden) {
                        $scope.param.Roles.push(role);
                    }
                });

                if (type == 'Xls') {
                    var jsonResult = $scope.ReportService.GenerateXls($scope.param, function () {
                        var filename = jsonResult.data;
                        $window.location.assign("/File/DownloadXls?name=" + encodeURIComponent(filename));

                        $scope.action = false;
                    });
                }
                else {
                    var jsonResult = $scope.ReportService.GeneratePdf($scope.param, function () {
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