angular.module('HITS')
    .controller('GcsFormCtrl',
   function GcsListCtrl($scope, $modal, $modalInstance,ToastMessageService, GcsService, GcsDetailService, gcsData) {
       $scope.gcs = gcsData;
       $scope.GcsDetails = {};
     //  $scope.Fetch();
       $scope.onSave = function (gcsData) {           
           var result = GcsService.Save(gcsData, function () {
               $modalInstance.close();

           });
       };

       $scope.Fetch = function () {
           var jsonResult = GcsDetailService.FetchAll({
               gcsId: $scope.gcs.gcs_id
           }, function () {
               $scope.gcsDetails = [];
               var dataGcsDetails = jsonResult.data;
               $scope.gcsDetails = dataGcsDetails;
               //console.log($scope.gcsDetails);
           });
       };
       
       $scope.onDelete = function (dataGcsDetail) {
           var index = $scope.gcs.GcsDetails.indexOf(dataGcsDetail);
           $scope.gcs.GcsDetails[index].is_active = false;
       };

       $scope.onRowDelete = function (data) {
           var sel = confirm("Are you sure you want to delete the GCS Detail [" + data.gcs_detail_description + "] ?");
           if (sel) {
               var jsonResult = GcsDetailService.Delete(data, function () {
                   var messageType = "", message = "";
                   if (jsonResult) {
                       messageType = "success";
                       message = "Data Deleted Succesfully";
                   } else {
                       messageType = "danger";
                       message = "Error Deleting Data";
                   }
                   ToastMessageService.addAlerts(messageType, message);
                   $scope.Fetch();
               });
           }
       };

       var openModal = function (data) {
           $modal.open({
               templateUrl: 'app/master/gcs/gcsDetail-form/gcsDetail-form.html',
               controller: 'GcsDetailFormCtrl',
               resolve: {
                   gcsData: function () {
                       return data;
                   }
               }
           }).result.then(function (result) {
               var messageType = "", message = "";
               if (result) {
                   messageType = "success";
                   message = "Data Saved Succesfully";
               } else {
                   messageType = "danger";
                   message = "Error Saving Data";
               }
               ToastMessageService.addAlerts(messageType, message);
               $scope.Fetch();
           });
       };

       $scope.onCreateNew = function (gcs_id) {
           $scope.gcs.GcsDetails.gcs_id = gcs_id;
           openModal($scope.gcs);
       };

       $scope.Fetch();
   });