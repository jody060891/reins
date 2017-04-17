angular.module('HITS')
 .controller('MeNoOfMedicationByDesignationDisciplineCtrl', function ($scope, MeNoOfMedicationByDesignationDisciplineReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_9_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
     $scope.param = {};
     $scope.control = {};
     $scope.service = MeNoOfMedicationByDesignationDisciplineReportService;
 });