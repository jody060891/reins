angular.module('HITS')
    .controller('FallExactLocationCtrl', function ($scope, FallsExactLocationReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_4_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsExactLocationReportService;
    });