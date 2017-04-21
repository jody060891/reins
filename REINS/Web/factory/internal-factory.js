angular.module('PKBL')
.value('UserSessionData', null)
.value('UserAclSessionData', null)
.factory('ToastMessageService', function() {
    var callback = function() {
    };
    var messages = [];
    return {
        addAlerts: function(messageType, message) {
            messages.push({type: messageType,msg: message});
            callback();
        },
        registerCallback: function(cb) {
            callback = cb;
        },
        getAlerts: function() {
            return messages;
        },
        removeAlerts: function() {
            messages = [];
            return messages;
        }
    };
})
    .factory('ApplicationStatusService', function() {
        var status = {
            userId : "",
            isElo: false
        };

        return {
            set: function(data){
                status = data;
            },
            get: function(){
                return status;
            },
            setInitialize: function(){
                status = {
                    userId : "",
                    isElo: false
                };
            }
        }
    })

.factory('SessionService', [
    '$rootScope', '$location', '$interval', '$timeout', '$modal', 'AuthenticationService', 'ApplicationStatusService',
    'IncidentService', 'ApplicationSettingService', 'UserSessionData', 'UserAclSessionData',
    function($rootScope, $location, $interval, $timeout, $modal, AuthenticationService, ApplicationStatusService, IncidentService, ApplicationSettingService, UserSessionData, UserAclSessionData) {
        var currentSession; // = {user_id: 0, username: "", institution_id: 0};


        var sessionTimeCount = 0;

        var timeOutInterval;
        var isPrompt = false;
        var status = {};


        var checkLoginStatus = function(callbackIfSuccess) {
            var jsonResult = AuthenticationService.IsLoggedIn(
                {
                    isElo: status.isElo
                }, function() {
                var isLoggedIn = jsonResult.data;
                if (isLoggedIn) {
                    service.setSession(UserSessionData);
                    var user = UserSessionData;


                    var intervalMinuteReminder = 2;
                    intervalMinuteReminder = intervalMinuteReminder * 60 * 1000;
                    var intervalMinuteTimeout = 10;
                    callbackIfSuccess(intervalMinuteReminder, intervalMinuteTimeout);

                    if ($location.path() == null || $location.path() == '' || $location.path() == '/') {

                        $location.path(user.default_landing_page);
                    } else {
                        window.location = "/Web/index.html#" + $location.$$url;
                    }
                } else {
                    if ($location.$$absUrl.indexOf("login") <= -1) {
                        if ($location.path() == null || $location.path() == '' || $location.path()) {
                            window.location = $rootScope.loginUrl + '#/';
                        } else {
                            window.location = $rootScope.loginUrl + '#' + $location.$$url;
                        }
                    }

                }
            });
        };

        var openModal = function(data) {
            $modal.open({
                templateUrl: 'internal/session-reminder/session-reminder.html',
                controller: 'SessionReminderCtrl',
                backdrop: 'static',
                resolve: {
                    SessionTimeoutData: function() {
                        return data;
                    }
                }
            }).result.then(function(result) {
                if (result) {
                    if (angular.isDefined(timeOutInterval)) {
                        $timeout.cancel(timeOutInterval);
                        timeOutInterval = undefined;
                    }
                    var user = service.getSession();
                    AuthenticationService.Login({
                        username: user.UserId,
                        password: user.password,
                        isElo: status.isElo
                    }, function() {
                        sessionTimeCount = 0;
                        isPrompt = false;
                    });
                }
                else {
                    if (angular.isDefined(timeOutInterval)) {
                        $timeout.cancel(timeOutInterval);
                        timeOutInterval = undefined;
                    }
                    AuthenticationService.Logout({}, function() {
                        sessionTimeCount = 0;
                        isPrompt = false;
                        window.location = $rootScope.loginUrl + '#/';
                    });
                }
            });
        };

        var service = {
            setSession: function(dataSession) {
                currentSession = dataSession;
            },
            getSession: function() {
                return currentSession;
            },
            setAclSession: function(dataAcl) {
                currentAcl = dataAcl;
            },
            getAclSession: function() {
                return currentAcl;
            },
            setStatus: function(data){
                status = data;
            },
            setAcltoScope: function(scp) {
                scp.currentAcl = {};

                angular.forEach(currentAcl, function(acl, k) {
                    scp.currentAcl[acl] = true;
                });
            },

            scheduleReminder: function() {

                checkLoginStatus(function(sessionTime, timeoutTime) {
                    $interval(function() {
                        sessionTimeCount++;
                        if (sessionTimeCount > (sessionTime / 60000 - 1) && !isPrompt) {
                            var timeoutMins = timeoutTime;
                            var intervalMinute = timeoutMins * 60 * 1000;
                            timeOutInterval = $timeout(function() {
                                AuthenticationService.Logout({}, function() {
                                    window.location = $rootScope.loginUrl + '#/';
                                });
                            }, intervalMinute);
                            openModal(timeoutMins);
                            isPrompt = true;
                        }

                        var jsonCurrentUser = AuthenticationService.GetCurrentUser(
                            {
                                isElo: status.isElo
                            },function() {
                            var resultUser = jsonCurrentUser.data;
                            if (resultUser == null || resultUser.UserId == null){
                                AuthenticationService.Logout({}, function() {
                                    window.location = $rootScope.loginUrl + '#/';
                                });
                            }
                            else if (resultUser.UserId != UserSessionData.UserId) {
                                window.location.reload();
                            }
                        }, function(){
                            AuthenticationService.Logout({}, function() {
                                window.location = $rootScope.loginUrl + '#/';
                            });
                        });
                    }, 60000);
                });
            },
            resetReminder: function() {
                sessionTimeCount = 0;
            },
            sendMessage: function (idFrame, domain, fn, param, haveReturnValue)
            {
                iframe = document.getElementById(idFrame).contentWindow;
                var message = {
                    fn: fn,
                    param: param,
                    result: null,
                    haveReturnValue: haveReturnValue
                };
                iframe.postMessage(message, domain);
            },
            addEventListener: function (domain, scope) {

                window.addEventListener('message', function (event) {
                    if (event.origin !== domain && domain !== '*')
                        return;
                    if (event.data.fn == "eval") {
                        var result = eval("scope."+event.data.param);

                        if (event.data.haveReturnValue) {
                            var message = {
                                fn: 'PostBack',
                                refFn: event.data.fn,
                                param: event.data.param,
                                result: result
                            };
                            event.source.postMessage(message, event.origin);
                        }
                    }
                }, false);
            },
            firstLoadElo: function(domain){
                window.addEventListener('message', function (event) {
                    var keys = event.data.split("|");
                    if(keys[0] === "ELO"){
                        var result = AuthenticationService.Login({
                            username: keys[1],
                            password: "",
                            isElo: true
                        }, function () {
                            var loginResult = result.data;
                            console.log(keys);
                            if (loginResult.IsSuccess) {
                                status = {
                                    userId : keys[1],
                                    isElo : true
                                };
                                console.log($location);
                                window.location = "/Web/index.html#" + $location.$$url;
                                ApplicationStatusService.set(status);
                                $("#reinsHeader").hide();
                                $("#sidebar").hide();
                                $("#content").removeClass();
                                $("#content").addClass("col-md-12 col-sm-12");
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

                    scheduleReminder();
                }, false);
            }
        };

        return service;
    }])
.factory('LoadingScreenService', function() {
    var callback = function() {
    };
    var isShow = true;
    return {
        showLoading: function() {
            isShow = true;
            callback();
        },
        registerCallback: function(cb) {
            callback = cb;
        },
        hideLoading: function() {
            isShow = false;
            callback();
        },
        getIsShow: function() {
            return isShow;
        }
    };
})
.config(function($httpProvider) {
    var $http, 
    interceptor = function($q, $injector, LoadingScreenService) {
        var rootScope;
        
        function success(response) {
            $http = $http || $injector.get('$http');
            if ($http.pendingRequests.length < 1) {
                LoadingScreenService.hideLoading();
            }
            return response;
        }
        
        function error(response) {
            $http = $http || $injector.get('$http');
            if ($http.pendingRequests.length < 1) {
                LoadingScreenService.hideLoading();
            }
            return $q.reject(response);
        }
        
        return function(promise) {
            LoadingScreenService.showLoading();
            return promise.then(success, error);
        };
    };
    $httpProvider.responseInterceptors.push(interceptor);
});
