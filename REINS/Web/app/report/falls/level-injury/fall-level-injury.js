angular.module('HITS')
    .controller('FallLevelInjuryCtrl', function ($scope, FallsLevelInjuryReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_1_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsLevelInjuryReportService;
    });