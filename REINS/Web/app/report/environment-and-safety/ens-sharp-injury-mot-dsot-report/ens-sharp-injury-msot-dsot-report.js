angular.module('HITS')
    .controller('EnsSharpInjuryMsotDsotReportCtrl', function ($scope, EnsSharpInjuryMsotDsotReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ENS_4_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsSharpInjuryMsotDsotReportService;
    });