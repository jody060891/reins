angular.module('HITS')
    .controller('MeNoOfMedicationByStaffDesignationCtrl', function ($scope, MeNoOfMedicationByStaffDesignationReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_7_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.param = {};
        $scope.control = {};
        $scope.service = MeNoOfMedicationByStaffDesignationReportService;
    });