angular.module('PKBL')
    .controller('UserProfileCtrl',
        function UserProfileCtrl($rootScope, $scope, $resource, $location, AuthenticationService, UserSessionData, SessionService) {
            $scope.userInfo = UserSessionData;

            $scope.onLogout = function () {
                var result = AuthenticationService.Logout(function () {
                    var isLoginSuccess = result.data;
                    if (isLoginSuccess) {
                        if ($location.path() == null || $location.path() == '' || $location.path() == '/') {
                            window.location = "/Web/login.html#/";
                        } else {
                            window.location = "/Web/login.html#/";
                        }
                    }
                });
            };
            
            $scope.onEditProfile = function () {
                if (!SessionService.isAnonymous()) {
                    $location.path("/editUser");
                }
                //$location.path();
            };

            $scope.onLogoClick = function(){
                $location.path($scope.userInfo.default_landing_page);
            }

        });
