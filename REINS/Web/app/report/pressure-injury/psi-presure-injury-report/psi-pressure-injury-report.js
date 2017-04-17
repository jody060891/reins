angular.module('HITS')
    .controller('PsiPressureInjuryReportCtrl', function ($scope, PressureInjuryReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['PSI_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = PressureInjuryReportService;
    });