angular.module('HITS')
    .controller('MedicationNameCtrl',function($rootScope, $scope, $resource, $location, $modalInstance, MedicationNameService, medicationData) {
        $scope.medication = medicationData;

        $scope.validate = {};
        $scope.validate.button = true;

        if ($scope.medication.medication_name) {
            $scope.validate.medication_name = false;
        }

        $scope.isValid = function () {
            $scope.validate.medication_name = !$scope.medication.medication_name;


            return !$scope.validate.medication_name;
        };

        $scope.onSave = function (data) {
            if ($scope.isValid()) {
                $scope.validate.button = false;
                var jsonResult = MedicationNameService.Save(data, function () {
                    var result = true;
                    $modalInstance.close(result);
                });
            }
        };

    });