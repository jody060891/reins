angular.module('HITS')
    .controller('FallByTimeCtrl', function ($scope, FallsTimeOccurenceReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_6_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsTimeOccurenceReportService;
    });