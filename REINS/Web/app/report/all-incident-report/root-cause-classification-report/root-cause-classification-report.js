angular.module('HITS')
    .controller('RootCauseClassificationReportCtrl', function ($scope, RootCauseClassificationReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_4_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = RootCauseClassificationReportService;
    });