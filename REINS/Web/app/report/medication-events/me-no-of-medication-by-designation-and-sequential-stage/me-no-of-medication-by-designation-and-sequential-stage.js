angular.module('HITS')
 .controller('MeNoOfMedicationByDesignationAndSequentialStageCtrl', function ($scope, MeNoOfMedicationByDesignationAndSequentialStageReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_8_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = MeNoOfMedicationByDesignationAndSequentialStageReportService;
 });