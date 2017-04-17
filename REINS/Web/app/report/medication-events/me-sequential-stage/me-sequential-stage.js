angular.module('HITS')
         .controller('MeSequentialStageCtrl', function ($scope, MeSequentialStageReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_5_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
             $scope.param = {};
             $scope.control = {};
             $scope.service = MeSequentialStageReportService;
         });