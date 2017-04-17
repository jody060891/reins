angular.module('HITS')
    .controller('FallDepartmentWorkloadCtrl', function ($scope, FallsDepartmentWorkloadReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['FALLS_10_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = FallsDepartmentWorkloadReportService;
    });