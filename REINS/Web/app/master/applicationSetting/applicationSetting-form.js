angular.module('HITS')
    .controller('ApplicationSettingFormCtrl',
      function ($rootScope, $scope, $resource, $location, $modal, ApplicationSettingService, ToastMessageService,
          SessionService, UserAclSessionData) {
          SessionService.setAclSession(UserAclSessionData);
          SessionService.setAcltoScope($scope);
          if (!$scope.currentAcl['SM_APPLICATION_SETTING_VIEW']){
              $location.path('/unauthorized');
          }
          var applicationSettingData;
          $scope.Fetch = function () {
              var jsonResult = ApplicationSettingService.FetchAll(function () {
                  $scope.applicationSettings = [];
                  var data_applicationSettings = jsonResult.data;
                  $scope.applicationSettings = data_applicationSettings;
                  applicationSettingData = $scope.applicationSettings;
              });
          };

          $scope.onSave = function (applicationSettingData) {
              var result = ApplicationSettingService.Save(applicationSettingData, function () {
                  alert("Successfully Saved!");                 
              });
          };

          $scope.OnSearch = function () {
              $scope.Fetch();
          };


          $scope.Fetch();
      });

  