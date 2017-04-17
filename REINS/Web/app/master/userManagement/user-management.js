angular.module('HITS')
    .controller('UserManagementCtrl', function ($scope, $location, AclService, $http, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_USER_MANAGEMENT']) {
            $location.path('/unauthorized');
        }

        var session = SessionService.getSession();
        $scope.institutionId = session.institution_id;

        $scope.userTabTemplate = "";
        $scope.roleTabTemplate = "";
        $scope.aclTabTemplate = "";
        $scope.mainScope = $scope;

        $scope.onFetchUserTab = function () {
            if ($scope.userTabTemplate.length <= 0) {
                var url = "app/master/userManagement/templates/user-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.userTabTemplate = template;
                });
            }
        };

        $scope.onFetchRoleTab = function () {
            if ($scope.roleTabTemplate.length <= 0) {
                var url = "app/master/userManagement/templates/role-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.roleTabTemplate = template;
                });
            }
        };

        $scope.onFetchAclTab = function() {
            if ($scope.aclTabTemplate.length <= 0) {
                var url = "app/master/userManagement/templates/acl-list-template.html";
                $http.get(url).then(function (result) {
                    var template = result.data;
                    $scope.aclTabTemplate = template;
                });
            }
        };

        $scope.onFetchUserTab();

        $scope.$on('$destroy', function() {
            var dom = document.getElementById('user-management-content');
            if (dom) {
                var mainDiv = $("#user-management-content");
                mainDiv.each(function(i, e) {
                    if (e.parentNode)
                        e.parentNode.removeChild(e);
                });
                mainDiv.empty();
                mainDiv.remove();
            }
        });

});