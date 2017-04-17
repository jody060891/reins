/// <reference path="committeeGroupForm-spec.js" />
angular.module('HITS').controller('CommitteegroupformCtrl', function ($scope, committeeGroup, CommitteeGroupService, $modal, $modalInstance, IncidentTypeService, RoleService, LoadingScreenService) {
    $scope.incidentSubType = {};
    $scope.checkbox = [];
    $scope.committeeGroup = committeeGroup;
    $scope.subType = {};
    $scope.hash = [];
    
    angular.forEach($scope.committeeGroup.IncidentSubTypes, function (choosenSubtype, j) {
        //$scope.hash.push(choosenSubtype.incident_sub_type_id);
        $scope.hash[j] = choosenSubtype.incident_sub_type_id;
        
    });

    $scope.incidentType = {};

    $scope.checkSelected = function (incident_subtype_id) {
        var result = false;
        angular.forEach($scope.committeeGroup.IncidentSubTypes, function (choosenSubtype, j) {
            if(!result){
                if (choosenSubtype.incident_sub_type_id == incident_subtype_id) {
                    result = true;
                }
            }
        });
        return result;
    };
    $scope.FetchAll = function () {
        var jsonResult = IncidentTypeService.FetchAll(function () {
            $scope.incidentTypes = jsonResult.data;
            
            
            angular.forEach($scope.incidentTypes, function (incidentType, h) {
                if (incidentType.incident_type_id == committeeGroup.incident_type_id && incidentType.MasterIncidentSubTypes != null) {
                    angular.forEach(incidentType.MasterIncidentSubTypes, function (subType, i) {
                        subType.is_selected = false;

                        
                        if ($scope.checkSelected(subType.incident_sub_type_id)) {
                            subType.is_selected = true;
                        }
                    });
                }

            });
        });

        var roleResult = RoleService.FetchAll(function () {
            $scope.Roles = roleResult.data;
        });
    };

    $scope.openDisciplineForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeDisciplineForm/committeeDisciplineForm.html',

            controller: 'CommitteedisciplineformCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.committeeGroup = result;
        });
    };

    $scope.openDepartmentForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeDepartmentForm/committeeDepartmentForm.html',

            controller: 'CommitteedepartmentformCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.committeeGroup = result;
        });
    };

    $scope.openLocationForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeLocationForm/committeeLocationForm.html',

            controller: 'CommitteelocationformCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.committeeGroup = result;
        });
    };

    $scope.openPersonCategoryForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeePersonCategoryForm/committeePersonCategoryForm.html',

            controller: 'CommitteepersoncategoryformCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.committeeGroup = result;
        });
    };

    $scope.openEmployeeCategoryForm = function (data){
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committee-emp-category-form/committee-emp-category-form.html',

            controller: 'CommitteeEmpCategoryFormCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
                $scope.committeeGroup = result;
        });
    };
    


    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.validate = {};
    $scope.validate.button = true;

    if ($scope.committeeGroup.name) {
        $scope.validate.name = false;
    }
    if ($scope.committeeGroup.incident_type_id) {
        $scope.validate.incident_type_id = false;
    }

    $scope.isValid = function () {
        if ($scope.committeeGroup.name) {
            $scope.validate.name = false;
        } else {
            $scope.validate.name = true;
        }
        //if ($scope.committeeGroup.incident_type_id) {
        //    $scope.validate.incident_type_id = false;
        //} else {
        //    $scope.validate.incident_type_id = true;
        //}

        if (!$scope.validate.name) {
            return true;
        } else {
            return false;
        }
    }

    $scope.onSave = function (data) {
        if ($scope.isValid()) {
            $scope.validate.button = false;
            $scope.savedSubTypes = [];
            angular.forEach($scope.incidentTypes, function (incidentType, h) {
                if (incidentType.incident_type_id == committeeGroup.incident_type_id && incidentType.MasterIncidentSubTypes != null) {
                    angular.forEach(incidentType.MasterIncidentSubTypes, function (subType, i) {

                        if (subType.is_selected) {
                            $scope.subtypeSelected = {};
                            $scope.subtypeSelected.incident_sub_type_id = subType.incident_sub_type_id;
                            $scope.subtypeSelected.IncidentSubType = subType;
                            $scope.savedSubTypes.push($scope.subtypeSelected);

                        }
                    });
                }

            });
            data.IncidentSubTypes = $scope.savedSubTypes;

            
            LoadingScreenService.showLoading();
            toggleAction();
            var result = CommitteeGroupService.Save(data, function () {
                LoadingScreenService.hideLoading();
                $modalInstance.close();

                toggleAction();
            });
        }
        
    };
    $scope.onChangeIncident = function () {
    }

    $scope.onChange = function (inputData) {
        
    }

    $scope.FetchAll();
});