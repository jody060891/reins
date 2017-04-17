angular.module('HITS').controller('AuditTrailDetailCtrl',function($scope, $window, auditTrailId, UserAuditTrailService){
    $window.scrollTo(0, 0);
    $scope.mouseOverDescription = false;
    $scope.dynamicFormScope = $scope;
    $scope.details = {};
    var details = UserAuditTrailService.FetchDetailFor({
        id: auditTrailId
    }, function () {
        $scope.details = details.data;
    });
});