angular.module('HITS')
    .controller('EnsPoliceReportLodgedReportCtrl', function ($scope, EnsPoliceReportLodgedReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['BHV_1_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsPoliceReportLodgedReportService;
    });