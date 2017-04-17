angular.module('HITS')
    .controller('HAMReportCtrl', function ($scope, $location, HAMReportService, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_6_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = HAMReportService;
    });