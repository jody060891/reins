angular.module('HITS')
 .controller('RcaHistoryReportCtrl', function ($scope, RCAHistoryReportService,$location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_7_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
     $scope.param = {};
     $scope.control = {};
     $scope.service = RCAHistoryReportService;
 });