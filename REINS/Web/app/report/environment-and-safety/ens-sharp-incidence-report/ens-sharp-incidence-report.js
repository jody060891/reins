angular.module('HITS')
    .controller('EnsSharpIncidenceReportCtrl', function ($scope, EnsIncidenceReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ENS_1_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsIncidenceReportService;
    });