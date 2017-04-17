angular.module('HITS')
    .controller('MeSafetyCommitteeByStaffReportCtrl', function ($scope, MeSafetyCommitteeByStaffReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_2_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = MeSafetyCommitteeByStaffReportService;
    });