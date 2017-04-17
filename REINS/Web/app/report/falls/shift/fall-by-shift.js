angular.module('HITS')
    .controller('FallByShiftCtrl', function ($scope, FallsShiftReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_7_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsShiftReportService;
    });