angular.module('HITS')
         .controller('MeLevelOfInjuryReportCtrl', function ($scope, MeLevelInjuryReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_3_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
             $scope.param = {};
             $scope.control = {};
             $scope.service = MeLevelInjuryReportService;
         });