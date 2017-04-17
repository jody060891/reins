angular.module('HITS')
    .controller('EnsWorkplaceAggressionN7ReportCtrl', function ($scope, EnsWorkplaceAggressionN7ReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['BHV_3_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = EnsWorkplaceAggressionN7ReportService;
    });