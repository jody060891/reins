angular.module('HITS')
    .controller('MeSafetyCommitteeByLocationReportCtrl', function ($scope, MeSafetyCommitteeByLocationReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_1_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = MeSafetyCommitteeByLocationReportService;
    });