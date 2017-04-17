angular.module('HITS')
    .controller('HospitalOccurrenceReportCtrl', function ($scope, HospitalOccurrenceReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_1_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = HospitalOccurrenceReportService;
    });