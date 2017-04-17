angular.module('HITS')
 .controller('SRENumberReportCtrl', function ($scope, SRENumberReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_5_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
     $scope.param = {};
     $scope.control = {};
     $scope.service = SRENumberReportService;
 });