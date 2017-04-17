angular.module('HITS')
    .controller('EnsSharpInjuryByDepartmentReportCtrl', function ($scope, EnsSharpInjuryByDepartmentReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ENS_3_REPORT_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsSharpInjuryByDepartmentReportService;
    });