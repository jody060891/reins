angular.module('HITS')
    .controller('EnsSharpInjuryHwcCtrl', function ($scope, EnsSharpInjuryAmongHcwReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ENS_2_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsSharpInjuryAmongHcwReportService;
    });