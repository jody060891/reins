angular.module('HITS')
 .controller('MeTypeOfMedicationCtrl', function ($scope, MeTypeOfMedicationReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_4_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
     $scope.param = {};
     $scope.control = {};
     $scope.service = MeTypeOfMedicationReportService;
 });