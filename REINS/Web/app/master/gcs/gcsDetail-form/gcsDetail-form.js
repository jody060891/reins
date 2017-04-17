angular.module('HITS')
    .controller('GcsDetailFormCtrl',
     function GcsDetailFormCtrl($rootScope, $scope, $resource, $location, $modalInstance, GcsDetailService, gcsData) {
         $scope.gcs = gcsData.gcs;
         $scope.onSave = function (gcsData) {
             var result = GcsDetailService.Save(gcsData, function () {
                 $modalInstance.close();
             });
         };
     });