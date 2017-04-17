angular.module('HITS')
    .controller('ConfirmationModalCtrl',function($scope, $modalInstance, bodyMessage){
        $scope.bodyMessage = bodyMessage;
        $scope.result = false;

        $scope.onConfirm = function(){
            $scope.result = true;
            $modalInstance.close($scope.result);
        };

        $scope.onCancel = function(){
            $scope.result = false;
            $modalInstance.close($scope.result);
        };
    });