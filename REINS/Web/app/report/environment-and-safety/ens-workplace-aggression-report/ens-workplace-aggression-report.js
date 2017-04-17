angular.module('HITS')
    .controller('EnsWorkplaceAggressionReportCtrl', function ($scope, EnsWorkplaceAggressionReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['BHV_2_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsWorkplaceAggressionReportService;
    });