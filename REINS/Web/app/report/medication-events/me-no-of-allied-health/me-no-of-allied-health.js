angular.module('HITS')
         .controller('MeNoOfAlliedHealthCtrl', function ($scope, MeAlliedHealthReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_10_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
             $scope.param = {};
             $scope.control = {};
             $scope.service = MeAlliedHealthReportService;
         });