angular.module('HITS')
    .controller('FallAgeGroupCtrl', function ($scope, FallsAgeGroupReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_8_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsAgeGroupReportService;
    });