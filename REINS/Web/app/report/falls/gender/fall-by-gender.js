angular.module('HITS')
    .controller('FallByGenderCtrl', function ($scope, FallsGenderReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_11_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsGenderReportService;
    });