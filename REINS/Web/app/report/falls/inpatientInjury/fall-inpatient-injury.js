angular.module('HITS')
    .controller('FallInpatientInjuryCtrl', function ($scope, FallsInpatientInjuryReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_2_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsInpatientInjuryReportService;
    });