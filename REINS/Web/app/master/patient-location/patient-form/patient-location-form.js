angular.module('HITS').controller('PatientLocationFormCtrl',
    function PatientClassListCtrl($rootScope, $scope, $resource, $location, $modalInstance, PatientLocationService, patientLocationData) {
    $scope.patientLocation = patientLocationData;

    $scope.onSave = function (patientLocationData) {
        var result = PatientLocationService.Save(patientLocationData, function () {
            $modalInstance.close();

        });
    };

});