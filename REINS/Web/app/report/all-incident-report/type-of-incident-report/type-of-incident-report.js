angular.module('HITS')
    .controller('TypeOfIncidentReportCtrl', function ($scope, TypeOfIncidentReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_2_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = TypeOfIncidentReportService;
    });