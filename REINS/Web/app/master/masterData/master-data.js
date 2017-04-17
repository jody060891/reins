angular.module('HITS')
    .controller('MasterDataCtrl', function ($scope, $location, AclService, $http, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_USER_MANAGEMENT']) {
            $location.path('/unauthorized');
        }

        var session = SessionService.getSession();
        $scope.institutionId = session.institution_id;

        $scope.masterDataTemplate = "";
        $scope.mainScope = $scope;
        $scope.mastertab = 0;

        $scope.onFetchAEAttendanceTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/ae-attendance-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchDepartmentTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/department-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchDesignationTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/designation-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchDisciplineTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/discipline-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchEmployeeCategoryTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/employeeCategory-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchLocationTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/location-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchPatientClassTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/patientClass-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchPatientDaysTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/patient-days-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchPatientLocationTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/patient-location-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchShiftTimingTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/shift-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchAdmissionDaysTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/admission-days-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchDesignationGroupTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/designation-group-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchMedicationNameTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/medication-name-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onFetchOperationDaysTab = function () {
            $scope.masterDataTemplate = "";
            if ($scope.masterDataTemplate.length <= 0) {
                var url = "app/master/masterData/templates/operation-days-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.masterDataTemplate = template;
                });
            }
        };

        $scope.onTabChanged = function () {
            if ($scope.mastertab == 1) {
                $scope.onFetchAEAttendanceTab();
            }else if ($scope.mastertab == 2) {
                $scope.onFetchDepartmentTab();
            }else if ($scope.mastertab == 3) {
                $scope.onFetchDesignationTab();
            } else if ($scope.mastertab == 4) {
                $scope.onFetchDisciplineTab();
            } else if ($scope.mastertab == 5) {
                $scope.onFetchEmployeeCategoryTab();
            } else if ($scope.mastertab == 6) {
                $scope.onFetchLocationTab();
            } else if ($scope.mastertab == 7) {
                $scope.onFetchPatientClassTab();
            } else if ($scope.mastertab == 8) {
                $scope.onFetchPatientDaysTab();
            } else if ($scope.mastertab == 9) {
                $scope.onFetchPatientLocationTab();
            } else if ($scope.mastertab == 10) {
                $scope.onFetchShiftTimingTab();
            } else if ($scope.mastertab == 11) {
                $scope.onFetchAdmissionDaysTab();
            } else if ($scope.mastertab == 12) {
                $scope.onFetchDesignationGroupTab();
            } else if ($scope.mastertab == 13) {
                $scope.onFetchMedicationNameTab();
            } else if ($scope.mastertab == 14) {
                $scope.onFetchOperationDaysTab();
            } else {
                $scope.masterDataTemplate = "";
            }
        };
        

        $scope.$on('$destroy', function () {
            var dom = document.getElementById('master-data-content');
            if (dom) {
                var mainDiv = $("#master-data-content");
                mainDiv.each(function (i, e) {
                    if (e.parentNode)
                        e.parentNode.removeChild(e);
                });
                mainDiv.empty();
                mainDiv.remove();
            }
        });
});