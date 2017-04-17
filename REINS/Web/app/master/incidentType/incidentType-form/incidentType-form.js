angular.module('HITS')
    .controller('IncidentTypeFormCtrl',
     function IncidentTypeListCtrl($scope, $modal, $modalInstance, IncidentTypeService, IncidentSubTypeService, incidentTypeData, incidentTypeLength, ToastMessageService) {
         
         $scope.order_no = [incidentTypeLength];
         for (var i = 0; i < incidentTypeLength; i++) {
             $scope.order_no[i] = i + 1;
         }

         $scope.incidentType = {};
         $scope.incidentSubTypes = [];
         if (incidentTypeData != null) {
             $scope.incidentType = incidentTypeData;
             if($scope.incidentType.MasterIncidentSubTypes != null) {
                 $scope.incidentSubTypes = incidentTypeData.MasterIncidentSubTypes;

             }
         }

         $scope.validate = {};
         $scope.validate.button = true;

         if ($scope.incidentType.incident_type_name) {
             $scope.validate.incident_type_name = false;
         }
         if ($scope.incidentType.description) {
             $scope.validate.description = false;
         }

         $scope.isValid = function () {
             if ($scope.incidentType.incident_type_name) {
                 $scope.validate.incident_type_name = false;
             } else {
                 $scope.validate.incident_type_name = true;
             }
             if ($scope.incidentType.description) {
                 $scope.validate.description = false;
             } else {
                 $scope.validate.description = true;
             }


             if (!$scope.validate.incident_type_name && !$scope.validate.description) {
                 return true;
             } else {
                 return false;
             }
         }

         $scope.onSave = function () {
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 if ($scope.incidentType != null) {
                     $scope.incidentType.MasterIncidentSubTypes = $scope.incidentSubTypes;

                     var result = IncidentTypeService.Save($scope.incidentType, function () {
                         $modalInstance.close(true);

                     });


                 }
             }
         };

         $scope.Fetch = function () {
         };

         $scope.onDelete = function (dataIncidentSubType) {
             $scope.incidentSubTypes.splice($scope.incidentSubTypes.indexOf(dataIncidentSubType), 1);
             if ($scope.incidentSubTypes.length == 0) {
                 $scope.incidentType.tooltip_info = "";
             }
         };

         $scope.onRowEdit = function (dataIncidentSubType) {
             openModal(dataIncidentSubType, $scope.incidentSubTypes.indexOf(dataIncidentSubType));
         }

         $scope.onRowDelete = function (data) {
             var sel = confirm("Are you sure you want to delete the Incident Sub Type [" + data.incident_sub_type_name + "] ?");
             if (sel) {
             }
         };

         var openModal = function (data, indexSubtype) {
             $modal.open({
                 templateUrl: 'app/master/incidentType/incidentSubType-form/incidentSubType-form.html',
                 controller: 'IncidentSubTypeFormCtrl',
                 windowClass: '',
                 resolve: {
                     incidentSubTypeData: function () {
                         return data;
                     },
                     indexSubtype: function () {
                         return indexSubtype;
                     },
                     indexSubtypeLength: function () {
                         return $scope.incidentSubTypes.length;
                     }
                 }
             }).result.then(function (result) {
                 if (indexSubtype == null) {
                     $scope.incidentSubTypes.push(result);
                 } else {
                     var incident_sub_type_id_index = 0;
                     if ($scope.incidentSubTypes[indexSubtype].incident_sub_type_id != null) {
                         incident_sub_type_id_index = $scope.incidentSubTypes[indexSubtype].incident_sub_type_id;
                         $scope.incidentSubTypes[indexSubtype] = result;
                         $scope.incidentSubTypes[indexSubtype].incident_sub_type_id = incident_sub_type_id_index;
                     } else {
                         $scope.incidentSubTypes[indexSubtype] = result;
                     }
                 }
             });
         };

         $scope.onCreateNew = function () {
             //$scope.incidentType.tooltip_info = "";
             openModal(null, null);
         };

         $scope.Fetch();
     });