angular.module('PKBL')
    .controller('LoginCtrl',
        function LoginCtrl($rootScope, $scope, $resource, $location, cfpLoadingBar, AuthenticationService, InstitutionService, SessionService, ToastMessageService, UserService) {
            $scope.userInfo = {};
            var publicKey = "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";

            $scope.doEncrypt = function (str){
                var crypt = new JSEncrypt();
                crypt.setKey(publicKey);
                var encrypted = crypt.encrypt(str);//cseInstance.encrypt(str);
                return encrypted;
            };

            $scope.onLogin = function (userInfo) {
                if ((!userInfo || userInfo == null)){
                    ToastMessageService.removeAlerts();
                    ToastMessageService.addAlerts("danger", "Please provide your login ID and password");
                    return;
                }
                else if (!userInfo.username || userInfo.username == ""){
                    ToastMessageService.removeAlerts();
                    ToastMessageService.addAlerts("danger", "Please provide your login ID");
                    return;
                }
                else if (!userInfo.password || userInfo.password == ""){
                    ToastMessageService.removeAlerts();
                    ToastMessageService.addAlerts("danger", "Please provide your password");
                    return;
                }

                var encryptedPassword = $scope.doEncrypt(userInfo.password);

                var result = AuthenticationService.Login({
                    username: userInfo.username,
                    password: encryptedPassword
                }, function () {
                    var loginResult = result.data;
                    if (loginResult.IsSuccess) {
                        ToastMessageService.addAlerts("success", "Successfully login");
                        if ($location.path() == null || $location.path() == '' || $location.path() == '/') {
                            window.location = "/Web/index.html#/";
                        } else {
                            window.location = "/Web/index.html#" + $location.$$url;
                        }
                    }
                    else {
                        var message = loginResult.Message;
                        //var message = "Login failed. The User ID or Password is incorrect.";
                        if (loginResult.Message == "User is not active!") {
                            message = "Login failed. User is not active!";
                        }
                        //var message = "Login Failed. Error : " + loginResult.Message;

                        ToastMessageService.removeAlerts();
                        ToastMessageService.addAlerts("danger", message);
                    }
                }, function(){
                    window.location.reload();
                });
            };

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

            window.addEventListener('message',function(event) {
                var keys = event.data.split("|");
                if(keys[0] === "ELO"){
                    var result = AuthenticationService.Login({
                        username: keys[1],
                        password: "",
                        isElo: true
                    }, function () {
                        var loginResult = result.data;
                        if (loginResult.IsSuccess) {
                            ToastMessageService.addAlerts("success", "Successfully login");
                            if ($location.path() == null || $location.path() == '' || $location.path() == '/') {
                                window.location = "/Web/index.html#/"+"?isElo=true&userId="+keys[1];
                            } else {
                                window.location = "/Web/index.html#" + $location.$$url+"?isElo=true&userId="+keys[1];
                            }
                        }
                        else {
                            var message = loginResult.Message;
                            //var message = "Login failed. The User ID or Password is incorrect.";
                            if (loginResult.Message == "User is not active!") {
                                message = "Login failed. User is not active!";
                            }
                            //var message = "Login Failed. Error : " + loginResult.Message;

                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts("danger", message);
                        }
                    }, function(){
                        window.location.reload();
                    });

                }

            },false);
            
            $scope.onEditProfile = function () {
            };

            $scope.onKeyPress = function ($event, userInfo) {
                if ($event.keyCode === 13) {
                    $scope.onLogin(userInfo);
                }
            };


            var result = AuthenticationService.GetCurrentUser(function () {
                if (result) {
                    $scope.userInfo = result.data;
                    if ($scope.userInfo != null) {
                        $scope.userInfo.username = null;
                        $scope.userInfo.password = null;
                    }
                }
            });
            $scope.user = {};
            $scope.createUser = {};
            $scope.createUser.validation = {};
            $scope.createUser.validation.errorMessage = "";
            $scope.createUser.validation.isValid = true;
            $scope.createUser.validation.createdSucceed = false;
            $scope.createUser.validation.createFailed = false;
            $scope.createUser.validation.button = true;

            $scope.isValid = function(){
                $scope.createUser.validation.FirstName = false;
                $scope.createUser.validation.LastName = false;
                $scope.createUser.validation.Company = false;
                $scope.createUser.validation.Position = false;
                $scope.createUser.validation.Email = false;
                $scope.createUser.validation.Phone = false;
                $scope.createUser.validation.Password = false;
                $scope.createUser.validation.ConfirmationPassword = false;
                $scope.createUser.validation.PasswordMatch = false;

                if($scope.user.FirstName != null && $scope.user.FirstName != ""){
                    $scope.createUser.validation.FirstName = true;
                }
                if($scope.user.LastName != null && $scope.user.LastName != ""){
                    $scope.createUser.validation.LastName = true;
                }
                if($scope.user.Company != null && $scope.user.Company != ""){
                    $scope.createUser.validation.Company = true;
                }
                if($scope.user.Position != null && $scope.user.Position != ""){
                    $scope.createUser.validation.Position = true;
                }
                if($scope.user.Email != null && $scope.user.Email != ""){
                    $scope.createUser.validation.Email = true;
                }
                if($scope.user.Phone != null && $scope.user.Phone != ""){
                    $scope.createUser.validation.Phone = true;
                }
                if($scope.user.Password != null && $scope.user.Password != ""){
                    $scope.createUser.validation.Password = true;
                }
                if($scope.user.ConfirmationPassword != null && $scope.user.ConfirmationPassword != ""){
                    $scope.createUser.validation.ConfirmationPassword = true;
                    if($scope.createUser.validation.Password && $scope.user.ConfirmationPassword == $scope.user.Password)
                        $scope.createUser.validation.PasswordMatch = true;
                }

                $scope.createUser.validation.isValid = $scope.createUser.validation.FirstName && $scope.createUser.validation.LastName
                                                        && $scope.createUser.validation.Company && $scope.createUser.validation.Position
                                                        && $scope.createUser.validation.Email && $scope.createUser.validation.Phone
                                                        && $scope.createUser.validation.Password && $scope.createUser.validation.ConfirmationPassword
                                                        && $scope.createUser.validation.PasswordMatch;

                return $scope.createUser.validation.isValid;
            };

            $scope.onCreateUser = function(userInfo){
                if($scope.isValid()){
                    $scope.createUser.validation.button = false;
                    cfpLoadingBar.start();
                    var jsonResult = UserService.Save(userInfo, function(){
                        var result = jsonResult.data;
                        if(result.IsSuccess){
                            $scope.createUser.validation.createdSucceed = true;
                            $scope.createUser.validation.createFailed = false;
                            window.location = '/Web/login.html';
                        }else{
                            $scope.createUser.validation.createdSucceed = false;
                            $scope.createUser.validation.createFailed = true;
                            $scope.createUser.validation.errorMessage = result.Message;
                        }
                        $scope.createUser.validation.button = true;
                        cfpLoadingBar.complete();

                    });
                }
            };
            //$scope.userInfo = SessionService.getSession();
        });
