angular.module('HITS')
.controller('MeTypeOfMedicationErrorReportCtrl', function ($scope, MeTypeOfMedicationErrorReportService, $location, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['ME_6_REPORT_VIEW']){
            $location.path('/unauthorized');
        }
    $scope.param = {};
    $scope.control = {};
    $scope.service = MeTypeOfMedicationErrorReportService;
});