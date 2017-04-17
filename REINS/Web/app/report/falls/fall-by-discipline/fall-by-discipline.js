angular.module('HITS')
    .controller('FallByDisciplineCtrl', function ($scope, FallsDisciplineReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_9_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsDisciplineReportService;
    });