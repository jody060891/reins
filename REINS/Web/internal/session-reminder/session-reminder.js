angular.module('PKBL')
    .controller('SessionReminderCtrl',function($scope, $modalInstance, SessionTimeoutData){
        $scope.sessionTimeout = SessionTimeoutData;
        $scope.onYes = function () {
            $modalInstance.close(true);
        };
        $scope.onNo = function () {
            $modalInstance.close(false);
        };
    });