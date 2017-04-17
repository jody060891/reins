angular.module('HITS')
     .controller('IncidentSubTypeFormCtrl', 
        function IncidentTypeFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, IncidentSubTypeService, incidentSubTypeData, indexSubtype, indexSubtypeLength) {
            $scope.incidentSubType = {};
            if (incidentSubTypeData != null) {
                $scope.incidentSubType.incident_sub_type_name = incidentSubTypeData.incident_sub_type_name;
                $scope.incidentSubType.description = incidentSubTypeData.description;
                $scope.incidentSubType.is_specify = incidentSubTypeData.is_specify;
                $scope.incidentSubType.keywords = incidentSubTypeData.keywords;
                $scope.incidentSubType.order_no = incidentSubTypeData.order_no;
            }
            
            $scope.order_no = [indexSubtypeLength];
            for (var i = 0; i < indexSubtypeLength; i++) {
                $scope.order_no[i] = i + 1;
            }

            $scope.validate = {};
            $scope.validate.button = true;

            if ($scope.incidentSubType.incident_sub_type_name) {
                $scope.validate.incident_sub_type_name = false;
            }
            if ($scope.incidentSubType.description) {
                $scope.validate.description = false;
            }

            $scope.isValid = function () {
                if ($scope.incidentSubType.incident_sub_type_name) {
                    $scope.validate.incident_sub_type_name = false;
                } else {
                    $scope.validate.incident_sub_type_name = true;
                }
                if ($scope.incidentSubType.description) {
                    $scope.validate.description = false;
                } else {
                    $scope.validate.description = true;
                }


                if (!$scope.validate.incident_sub_type_name && !$scope.validate.description) {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.onSave = function () {
                if ($scope.isValid()) {
                    $scope.validate.button = false;
                    $modalInstance.close($scope.incidentSubType);
                }
            };

        });