angular.module('HITS').controller('RawDataCtrl', function ($scope, $window, $timeout, $location, RawDataService, IncidentTypeService, IncidentSubTypeService, RoutingGroupService,
    SessionService, LocationService, DepartmentService, UserAclSessionData, LoadingScreenService) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    if (!$scope.currentAcl['RAW_INCIDENT_EXTRACTION_VIEW']){
        $location.path('/unauthorized');
    }
    $scope.param = {
        person_type: {}
    };
    $scope.flt = {
        person_type: {}
    };

    $scope.isDateEnable = true;

    $scope.datePickerOpen = function (id) {
        $timeout(function () {
            $("#" + id).focus();
        });
    };

    $scope.onChangeIncidentType = function () {
        angular.forEach($scope.incidentSubTypes, function (l, k) {
            l.is_selected = false;
        });
        angular.forEach($scope.incidentTypes, function (type, k) {
            if(type.incident_type_id == $scope.param.incident_type_id) {
                $scope.incidentTypeSelected = type;
            }
        });
        $scope.FetchLocation();
        $scope.FetchDepartment();
    };

    var typeResult = IncidentTypeService.FetchAllByUserId(function () {
        $scope.incidentTypes = typeResult.data;
    });


    var subTypeResult = IncidentSubTypeService.FetchAll(function () {
        $scope.incidentSubTypes = subTypeResult.data;

        $scope.hashIncidentSubType = {};
        angular.forEach($scope.incidentSubTypes, function (sub, k) {
            $scope.hashIncidentSubType[sub.incident_sub_type_id] = sub;
        });
    });

    $scope.FetchLocation = function() {
        var jsonLocationResult = LocationService.FetchAllLocationByUserId({ incidentTypeId: $scope.param.incident_type_id }, function() {
            $scope.locations = jsonLocationResult.data;

            $scope.hashLocation = {};
            angular.forEach($scope.locations, function(loc, k) {
                $scope.hashLocation[loc.location_id] = loc;
            });
        });
    };
    $scope.FetchLocation();

    $scope.FetchDepartment = function() {
        var jsonDepartmentResult = DepartmentService.FetchAllDepartmentByUserId({ incidentTypeId: $scope.param.incident_type_id }, function() {
            $scope.departments = jsonDepartmentResult.data;
            $scope.hashDepartment = {};
            angular.forEach($scope.departments, function(dep, k) {
                $scope.hashDepartment[dep.department_id] = dep;
            });
        });
    };
    $scope.FetchDepartment();

    $scope.selectAll = function (list, con) {
        angular.forEach(list, function (l, k) {
            l.is_selected = con;
        });
    };

    $scope.selectSubTypeAll = function (list, con) {
        angular.forEach(list, function (l, k) {
            if (l.incident_type_id == $scope.param.incident_type_id) {
                l.is_selected = con;
            }
        });
    };

    $scope.select = function (list, hash, con) {
        angular.forEach(list, function (l, k) {
            if (hash[l]) {
                hash[l].is_selected = con;
            }
        });
    };

    $scope.personCategories = ["Patient", "Staff", "Visitor", "Others"];



    $scope.any = function () {
        var result = false;
        angular.forEach($scope.incidentSubTypes, function (sub, key) {
            if (sub.incident_type_id == $scope.param.incident_type_id) result = true;
        });

        if (!result) $scope.param.incident_sub_type_id = "";

        return result;
    };

    var someSelected = function (object) {
        if (!object) return false;

        return Object.keys(object).some(function (key) {
            return object[key];
        });
    };

    $scope.onClickPatient = function(){
        if (!$scope.flt.person_type.patient){
            if ($scope.flt.patient_type == null) $scope.flt.patient_type = {};
            $scope.flt.patient_type.inpatient = false;
            $scope.flt.patient_type.outpatient = false;
        }
    };

    $scope.onGenerateXls = function () {
        $scope.clicked = true;
        if (!$scope.param.incident_type_id) return;
        $scope.locationNotValid = false;

        $scope.param.SubTypes = [];
        angular.forEach($scope.incidentSubTypes, function (sub, key) {
            if (sub.is_selected) {
                $scope.param.SubTypes.push(sub.incident_sub_type_id);
            }
        });

        $scope.param.Locations = [];
        angular.forEach($scope.locations, function (loc, key) {
            if (loc.is_selected) {
                $scope.param.Locations.push(loc.location_id);
            }
        });

        if ($scope.param.Locations.length <= 0) {
            $scope.locationNotValid = true;
            return;
        }

        $scope.action = true;
        LoadingScreenService.showLoading();

        $scope.param.Departments = [];
        angular.forEach($scope.departments, function (dept, key) {
            if (dept.is_selected) {
                $scope.param.Departments.push(dept.department_id);
            }
        });

        $scope.param.near_miss = $scope.flt.near_miss;
        if (!someSelected($scope.param.near_miss)) {
            $scope.param.near_miss = {
                yes: true,
                no: true
            }
        }

        $scope.param.person_type = $scope.flt.person_type;
        if (!someSelected($scope.param.person_type)) {
            $scope.param.person_type = {
                patient: true,
                staff: true,
                visitor: true,
                other: true
            }
        }

        $scope.param.patient_type = {};
        if ($scope.param.person_type.patient) {
            $scope.param.patient_type = $scope.flt.patient_type;
            if (!someSelected($scope.param.patient_type)) {
                $scope.param.patient_type = {
                    inpatient: true,
                    outpatient: true
                }
            }
        }
        $scope.param.person_affected = {};
        if ($scope.param.person_affected) {
            $scope.param.person_affected = $scope.flt.person_affected;
            if (!someSelected($scope.param.person_affected)) {
                $scope.param.person_affected = {
                    yes: true,
                    no: true
                }
            }
        }

        var jsonResult = RawDataService.GenerateXls($scope.param, function () {
            var filename = jsonResult.data;
            $window.location.assign("/File/DownloadXls?name=" + encodeURIComponent(filename));

            $scope.action = false;
            LoadingScreenService.hideLoading();
        }, function(){
            $scope.action = false;
            LoadingScreenService.hideLoading();
        });
    }

});