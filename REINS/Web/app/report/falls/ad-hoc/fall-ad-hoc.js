angular.module('HITS')
.controller('FallAdHocCtrl', function ($scope, $timeout, $filter) {
    $scope.param = {
        report_type: "Monthly",
        report_type_period: "1",
        report_from_date: new Date(),
        report_to_date: new Date(),
        incident_type_id: 0
    };
    $scope.today = new Date();
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.flt = {};
    $scope.flt.month_year = $scope.today.getFullYear();
    $scope.flt.month_from = $scope.today.getMonth();
    if ($scope.flt.month_from == 0) {
        $scope.flt.month_from = 12;
    }
    $scope.flt.month_to = $scope.today.getMonth() + 1;

    $scope.flt.q_year = $scope.today.getFullYear();
    $scope.flt.q_from = "1";
    $scope.flt.q_to = "4";

    $scope.flt.hf_year = $scope.today.getFullYear();
    $scope.flt.hf_from = "1";
    $scope.flt.hf_to = "2";

    $scope.flt.year_from = $scope.today.getFullYear() - 1;
    $scope.flt.year_to = $scope.today.getFullYear();

    $scope.validation = {};

    $scope.pdfLink = "";
    $scope.datePickerOpen = function (id) {
        $timeout(function () {
            $("#" + id).focus();
        });
    };

    $scope.onGenerateXls = function () {
        var valid = true;
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
            if ($scope.flt.month_from > $scope.flt.month_to) {
                valid = false;
                $scope.validation.month_period = true;
            }
            else {
                $scope.param.report_type_period = "Monthly From " + $scope.months[$scope.flt.month_from - 1] + " To " + $scope.months[$scope.flt.month_to - 1] + ", " + $scope.flt.month_year;

                $scope.param.report_from_date = new Date($scope.flt.month_year, $scope.flt.month_from - 1, 1);
                $scope.param.report_to_date = new Date($scope.flt.month_year, $scope.flt.month_to, 0);

                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
            }
        }
        else if ($scope.param.report_type == "Quarterly") {
            if ($scope.flt.q_from > $scope.flt.q_to) {
                valid = false;
                $scope.validation.q_period = true;
            }
            else {
                if ($scope.flt.q_from == $scope.flt.q_to) {
                    $scope.param.report_type_period = "Quarterly, For Quarter " + $scope.flt.q_from + ", " + $scope.flt.q_year;
                }
                else {
                    $scope.param.report_type_period = "Quarterly From Quarter " + $scope.flt.q_from + " To Quarter " + $scope.flt.q_to + ", " + $scope.flt.month_year;
                }

                $scope.param.report_from_date = new Date($scope.flt.q_year, ($scope.flt.q_from - 1) * 3, 1);
                $scope.param.report_to_date = new Date($scope.flt.q_year, $scope.flt.q_to * 3, 0);

                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
            }
        }
        else if ($scope.param.report_type == "HalfYearly") {
            if ($scope.flt.hf_from > $scope.flt.hf_to) {
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

                $scope.param.report_from_date = new Date($scope.flt.hf_year, ($scope.flt.hf_from - 1) * 6, 1);
                $scope.param.report_to_date = new Date($scope.flt.hf_year, $scope.flt.hf_to * 6, 0);

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
                $scope.param.report_to_date = new Date($scope.flt.year_to, 11, 0);

                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
            }
        }

        $scope.pdfLink = "";
        if (valid) {
            $scope.pdfLink = "/FallsAdHocReport/GenerateXls/?" + $.param($scope.param, true);
            window.open($scope.pdfLink, "_blank");
        }
        //var result = SacScoreReportService.GeneratePdf($scope.param, function(){
        //
        //});
    };

    $scope.onGeneratePdf = function () {
        var valid = true;
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
            if ($scope.flt.month_from > $scope.flt.month_to) {
                valid = false;
                $scope.validation.month_period = true;
            }
            else {
                $scope.param.report_type_period = "Monthly From " + $scope.months[$scope.flt.month_from - 1] + " To " + $scope.months[$scope.flt.month_to - 1] + ", " + $scope.flt.month_year;

                $scope.param.report_from_date = new Date($scope.flt.month_year, $scope.flt.month_from - 1, 1);
                $scope.param.report_to_date = new Date($scope.flt.month_year, $scope.flt.month_to, 0);

                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
            }
        }
        else if ($scope.param.report_type == "Quarterly") {
            if ($scope.flt.q_from > $scope.flt.q_to) {
                valid = false;
                $scope.validation.q_period = true;
            }
            else {
                if ($scope.flt.q_from == $scope.flt.q_to) {
                    $scope.param.report_type_period = "Quarterly, For Quarter " + $scope.flt.q_from + ", " + $scope.flt.q_year;
                }
                else {
                    $scope.param.report_type_period = "Quarterly From Quarter " + $scope.flt.q_from + " To Quarter " + $scope.flt.q_to + ", " + $scope.flt.month_year;
                }

                $scope.param.report_from_date = new Date($scope.flt.q_year, ($scope.flt.q_from - 1) * 3, 1);
                $scope.param.report_to_date = new Date($scope.flt.q_year, $scope.flt.q_to * 3, 0);

                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
            }
        }
        else if ($scope.param.report_type == "HalfYearly") {
            if ($scope.flt.hf_from > $scope.flt.hf_to) {
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

                $scope.param.report_from_date = new Date($scope.flt.hf_year, ($scope.flt.hf_from - 1) * 6, 1);
                $scope.param.report_to_date = new Date($scope.flt.hf_year, $scope.flt.hf_to * 6, 0);

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
                $scope.param.report_to_date = new Date($scope.flt.year_to, 11, 0);

                $scope.param.report_from_date = $filter('momentDateFilter')($scope.param.report_from_date, 'YYYY-MM-DD');
                $scope.param.report_to_date = $filter('momentDateFilter')($scope.param.report_to_date, 'YYYY-MM-DD');
            }
        }

        $scope.pdfLink = "";
        if (valid) {
            $scope.pdfLink = "/FallsAdHocReport/GeneratePDF/?" + $.param($scope.param, true);
            window.open($scope.pdfLink, "_blank");
        }
    }

});