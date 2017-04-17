angular.module('HITS')
    .controller('IncidentReportCtrl', function ($scope,
        $location, SessionService, IncidentReportService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_REPORT_VIEW'] && !$scope.currentAcl['ME_REPORT_VIEW'] && !$scope.currentAcl['ENS_REPORT_VIEW']
             && !$scope.currentAcl['AI_REPORT_VIEW'] && !$scope.currentAcl['BHV_REPORT_VIEW'] && !$scope.currentAcl['PSI_REPORT_VIEW']) {
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = IncidentReportService;
    });