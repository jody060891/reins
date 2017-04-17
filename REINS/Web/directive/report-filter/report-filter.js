angular.module('PKBL').directive('reportFilter', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
		    param: "=",
		    control: "=",
            service: "="
		},
		templateUrl: 'directive/report-filter/report-filter.html',
		link: function(scope, element, attrs, fn) {


		},
		controller: function ($scope, RoutingGroupService, $filter, $timeout, $window, LoadingScreenService,
            IncidentTypeReportService, LocationService, DepartmentService) {
		    $scope.param = {
		        report_type: "Monthly",
		        report_type_period: "1",
		        report_from_date: new Date(),
		        report_to_date: new Date(),
		        incident_type_id: 0,
		        Locations: [],
		        Departments: [],
		        near_miss: {},
		        person_type: {},
		        patient_type: {},
                person_affected: {}
		    };
		    $scope.today = new Date();
		    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		    $scope.flt = {};
		    $scope.flt.month_year = $scope.today.getFullYear();
		    $scope.flt.month_year_to = $scope.today.getFullYear();
		    $scope.flt.month_from = 1;//$scope.today.getMonth();
		    if ($scope.flt.month_from == 0) {
		        $scope.flt.month_from = 12;
		    }
		    $scope.flt.month_to = $scope.today.getMonth() + 1;

		    $scope.flt.q_year = $scope.today.getFullYear();
		    $scope.flt.q_year_to = $scope.today.getFullYear();
		    $scope.flt.q_from = "1";
		    $scope.flt.q_to = "4";

		    $scope.flt.hf_year = $scope.today.getFullYear();
		    $scope.flt.hf_year_to = $scope.today.getFullYear();
		    $scope.flt.hf_from = "1";
		    $scope.flt.hf_to = "2";

		    $scope.flt.year_from = $scope.today.getFullYear() - 1;
		    $scope.flt.year_to = $scope.today.getFullYear();

		    $scope.flt.is_all_location = false;
		    $scope.flt.is_all_department = false;
		    //$scope.flt.is_near_miss = true;
		    //$scope.flt.person_type = "Patient";

		    $scope.validation = {};

		    $scope.isDateEnable = true;
		    $scope.pdfLink = "";
		    $scope.datePickerOpen = function (id) {
		        $timeout(function () {
		            $("#" + id).focus();
		        });
		    };

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
		    $scope.incident_type_id = 0;
		    $scope.fetchIncidentTypeReport = function() {
		        var jsonIncidentTypeReportResult = IncidentTypeReportService.FetchAllByUserId(function () {
		            $scope.incidentTypeReports = [];
		            $scope.incidentTypeReports = jsonIncidentTypeReportResult.data;
		        });
		    };

		    $scope.fetchIncidentTypeReport();

		    $scope.onIncidentTypeReportChange = function (IncidentTypeReportId) {
		        $scope.param.report_type_id = 0;
                $scope.ReportTypes = [];
                angular.forEach($scope.incidentTypeReports, function (incidentTypeReport, k) {
                    if (incidentTypeReport.incident_type_report_id == IncidentTypeReportId) {
                        $scope.param.incident_type_id = incidentTypeReport.incident_type_id;
                        $scope.incident_type_id = incidentTypeReport.incident_type_id;
                        $scope.ReportTypes = incidentTypeReport.ReportTypes;
                    }
                });
                $scope.FetchLocation();
                $scope.FetchDepartment();
                //$scope.ReportTypes = newIncidentTypeReport.ReportTypes;
		    };

		    $scope.FetchLocation = function () {
		        var jsonLocationResult = LocationService.FetchAllLocationByUserId({ incidentTypeId: $scope.incident_type_id }, function () {
		            $scope.locations = jsonLocationResult.data;

		            $scope.hashLocation = {};
		            angular.forEach($scope.locations, function (loc, k) {
		                $scope.hashLocation[loc.location_id] = loc;
		            });
		        });
		    };
		    $scope.FetchLocation();

		    $scope.FetchDepartment = function () {
		        var jsonDepartmentResult = DepartmentService.FetchAllDepartmentByUserId({ incidentTypeId: $scope.incident_type_id }, function () {
		            $scope.departments = jsonDepartmentResult.data;
		            $scope.hashDepartment = {};
		            angular.forEach($scope.departments, function (dep, k) {
		                $scope.hashDepartment[dep.department_id] = dep;
		            });
		        });
		    };
		    $scope.FetchDepartment();


		    $scope.onSelectAllLocation = function () {
		        angular.forEach($scope.locations, function (loc, key) {
		            loc.is_selected = $scope.flt.is_all_location;
		        });
		    };

		    $scope.onSelectAllDepartment = function () {
		        angular.forEach($scope.departments, function (dept, key) {
		            dept.is_selected = $scope.flt.is_all_department;
		        });
		    };


			$scope.onClickPatient = function(){
				if (!$scope.flt.person_type.patient){
					if ($scope.flt.patient_type == null) $scope.flt.patient_type = {};
					$scope.flt.patient_type.inpatient = false;
					$scope.flt.patient_type.outpatient = false;
				}
			};

		    $scope.internalControl = $scope.control || {};

		    $scope.internalControl.onGenerateXls = function (type) {
		        $scope.first = true;
		        $scope.locationNotValid = false;
		        $scope.validation.incident_type_report_id = false;
		        $scope.validation.report_type_id = false;
		        var valid = true;
		        if (!$scope.param.incident_type_report_id) {
		            valid = false;
		            $scope.validation.incident_type_report_id = true;
		        }
                if (!$scope.param.report_type_id) {
                    
                    angular.forEach($scope.incidentTypeReports, function (incidentTypeReport, k) {
                        if ($scope.param.incident_type_report_id > 0 &&
                            $scope.param.incident_type_report_id == incidentTypeReport.incident_type_report_id &&
                            incidentTypeReport.ReportTypes.length > 0) {
                            valid = false;
                            $scope.validation.report_type_id = true;
                        }
                    });
                    
                }
		        if ($scope.param.report_type == "DateRange") {

		            if ($scope.param.report_from_date > $scope.param.report_to_date) {
		                valid = false;
		                $scope.validation.date_period = true;
		            }
		            else {
		                $scope.param.report_type_period = "Date Range";
		                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');//"" + $scope.param.report_from_date.getFullYear() + "-" + ($scope.param.report_from_date.getMonth()+1) + "-" + $scope.param.report_from_date.getDate();
		                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD'); //"" + $scope.param.report_to_date.getFullYear() + "-" + ($scope.param.report_to_date.getMonth()+1) + "-" + $scope.param.report_to_date.getDate();
		            }
		        }
		        else if ($scope.param.report_type == "Monthly") {
		            $scope.param.report_from_date = new Date($scope.flt.month_year, $scope.flt.month_from - 1, 1);
		            $scope.param.report_to_date = new Date($scope.flt.month_year_to, $scope.flt.month_to, 0);

		            if ($scope.param.report_from_date > $scope.param.report_to_date) {
		                valid = false;
		                $scope.validation.month_period = true;
		            }
		            else {
		                $scope.param.report_type_period = "Monthly From " + $scope.months[$scope.flt.month_from - 1] + " " + $scope.flt.month_year + " To " + $scope.months[$scope.flt.month_to - 1] + " " + $scope.flt.month_year_to;
		                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
		                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
		            }
		        }
		        else if ($scope.param.report_type == "Quarterly") {
		            $scope.param.report_from_date = new Date($scope.flt.q_year, ($scope.flt.q_from - 1) * 3, 1);
		            $scope.param.report_to_date = new Date($scope.flt.q_year_to, $scope.flt.q_to * 3, 0);
		            if ($scope.param.report_from_date > $scope.param.report_to_date) {
		                valid = false;
		                $scope.validation.q_period = true;
		            }
		            else {
		                if ($scope.flt.q_from == $scope.flt.q_to) {
		                    $scope.param.report_type_period = "Quarterly, For Quarter " + $scope.flt.q_from + ", " + $scope.flt.q_year;
		                }
		                else {
		                    $scope.param.report_type_period = "Quarterly From Quarter " + $scope.flt.q_from + " " + $scope.flt.month_year + " To Quarter " + $scope.flt.q_to + " " + $scope.flt.month_year_to;
		                }
		                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
		                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
		            }
		        }
		        else if ($scope.param.report_type == "HalfYearly") {
		            $scope.param.report_from_date = new Date($scope.flt.hf_year, ($scope.flt.hf_from - 1) * 6, 1);
		            $scope.param.report_to_date = new Date($scope.flt.hf_year_to, $scope.flt.hf_to * 6, 0);
		            if ($scope.param.report_from_date > $scope.param.report_to_date) {
		                valid = false;
		                $scope.validation.hf_period = true;
		            }
		            else {
		                if ($scope.flt.hf_from == $scope.flt.hf_to) {
		                    if ($scope.flt.hf_from == 1) {
		                        $scope.param.report_type_period = "Half-Yearly, Jan - Jun, " + $scope.flt.q_year;
		                    }
		                    else {
		                        $scope.param.report_type_period = "Half-Yearly, Jul - Dec, " + $scope.flt.q_year;
		                    }
		                }
		                else {
		                    $scope.param.report_type_period = "Half-Yearly, From Jan - June and Jul - Dec , " + $scope.flt.month_year;
		                }

		                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
		                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
		            }
		        }
		        else if ($scope.param.report_type == "Yearly") {
		            if ($scope.flt.year_from > $scope.flt.year_to) {
		                valid = false;
		                $scope.validation.year_period = true;
		            }
		            else {
		                $scope.param.report_type_period = "Yearly From " + $scope.flt.year_from + " To " + $scope.flt.year_to;

		                $scope.param.report_from_date = new Date($scope.flt.year_from, 0, 1);
		                $scope.param.report_to_date = new Date($scope.flt.year_to, 12, 0);

		                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
		                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
		            }
		        }

		        //if (!$scope.someSelected($scope.flt.near_miss) || !$scope.someSelected($scope.flt.person_type) || ($scope.param.person_type.patient && !$scope.someSelected($scope.flt.patient_type))) valid = false;

		        $scope.pdfLink = "";
		        if (valid) {

		            $scope.param.Locations = [];
		            angular.forEach($scope.locations, function (loc, key) {
		                if (loc.is_selected) {
		                    $scope.param.Locations.push(loc);
		                }
		            });

		            if ($scope.param.Locations.length <= 0) {
		                $scope.locationNotValid = true;
		                return;
		            }

		            $scope.param.Departments = [];
		            angular.forEach($scope.departments, function (dept, key) {
		                if (dept.is_selected) {
		                    $scope.param.Departments.push(dept);
		                }
		            });

		            $scope.param.near_miss = $scope.flt.near_miss;
                    $scope.param.person_type = $scope.flt.person_type;
                    $scope.param.person_affected = $scope.flt.person_affected;
                    if (!$scope.someSelected($scope.param.person_affected)) {
                        $scope.param.person_affected = {
                            yes: true,
                            no: true
                        }
                    }
		            $scope.param.patient_type = null;
		            if ($scope.param.person_type && $scope.param.person_type.patient)
		                $scope.param.patient_type = $scope.flt.patient_type;
		            if (!$scope.someSelected($scope.param.near_miss)) $scope.param.near_miss = null;
		            if (!$scope.someSelected($scope.param.person_type)) $scope.param.person_type = null;
		            if (!$scope.someSelected($scope.param.patient_type)) $scope.param.patient_type = null;
                    if (!$scope.someSelected($scope.param.person_affected)) $scope.param.person_affected = null;


		            $scope.action = true;
		            LoadingScreenService.showLoading();

		            if (type == 'Xls') {
		                var jsonResult = $scope.service.GenerateXls($scope.param, function () {
		                    
		                    var filename = jsonResult.data;
		                    if (filename) {
		                        $window.location.assign("/File/DownloadXls?name=" + encodeURIComponent(filename));
		                    } else {
		                        alert("This Report is not available in Excel");
		                    }
		                    

		                    $scope.action = false;
		                    LoadingScreenService.hideLoading();
		                }, function(){
                            $scope.action = false;
                            LoadingScreenService.hideLoading();
                        });
		            }
		            else {
		                var jsonResult = $scope.service.GeneratePdf($scope.param, function () {
		                    var filename = jsonResult.data;
		                    if (filename) {
		                        $window.location.assign("/File/DownloadPdf?name=" + encodeURIComponent(filename));
		                    } else {
		                        alert("This Report is not available in PDF");
		                    }
		                    $scope.action = false;
		                    LoadingScreenService.hideLoading();
		                }, function(){
                            $scope.action = false;
                            LoadingScreenService.hideLoading();
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

		}
	};
});
