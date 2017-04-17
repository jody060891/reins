angular.module('HITS')
  .controller('SacScoreReportCtrl', function ($scope, SacScoreReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['AI_3_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
      $scope.param = {};
      $scope.control = {};
      $scope.service = SacScoreReportService;
  });