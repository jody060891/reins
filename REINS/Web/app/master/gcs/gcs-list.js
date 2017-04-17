angular.module('HITS')
      .controller('GcsListCtrl',
      //function ($scope, $modal, ToastMessageService, GcsService) {
        function GcsListCtrl($rootScope, $scope, $resource, $location, $modal, GcsService, ToastMessageService, SessionService, UserAclSessionData) {
            SessionService.setAclSession(UserAclSessionData);
            SessionService.setAcltoScope($scope);
          var openModal = function (data) {
              $modal.open({
                  templateUrl: 'app/master/gcs/gcs-form/gcs-form.html',
                  controller: 'GcsFormCtrl',
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

          $scope.Fetch = function () {
              var jsonResult = GcsService.FetchAll(function () {
                  $scope.gcss = [];
                  var gcsDatas = jsonResult.data;
                  $scope.gcss = gcsDatas;
              });
          };

          $scope.onCreateNew = function () {
              openModal(null);
          };

          $scope.onRowEdit = function (data) {                 
              openModal(angular.copy(data));
          };

          $scope.onRowDelete = function (data) {
              var sel = confirm("Are you sure you want to delete the GCS [" + data.gcs_description + "] ?");
              if (sel) {
                  var jsonResult = GcsService.Delete(data, function () {
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


          $scope.OnSearch = function () {
              $scope.Fetch();
          };


          $scope.Fetch();
      });