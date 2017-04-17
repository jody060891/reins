angular.module('HITS')
    .controller('FallLocationReportCtrl', function ($scope, FallsLocationReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_4_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsLocationReportService;
    });