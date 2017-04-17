angular.module('HITS')
    .controller('AclListCtrl', function ($scope, $location, AclService, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_USER_MANAGEMENT_ACL_VIEW']){
            $location.path('/unauthorized');
        }

        var session = SessionService.getSession();
        $scope.institutionId = session.institution_id;

        $scope.Fetch = function () {
            var jsonResult = AclService.FetchAll({
                institutionId: $scope.institutionId
            }, function () {
                $scope.acls = [];
                var data = jsonResult.data;
                $scope.acls = data;
            });
        };

        $scope.Fetch();
    });