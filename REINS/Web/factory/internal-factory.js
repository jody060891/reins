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
