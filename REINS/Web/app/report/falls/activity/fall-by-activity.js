angular.module('HITS')
    .controller('FallByActivityCtrl', function ($scope, FallsActivityReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_5_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsActivityReportService;
    });