angular.module('PKBL', [
    "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead", "ui.bootstrap.tooltip", "ui.bootstrap.popover",
    'ui.bootstrap.tpls',
    'ui.utils',
    'ngRoute',
    //'ngAnimate',
    'ngResource',
    'ivh.treeview',
    'wysiwyg.module',
    'angularFileUpload',
    'sticky',
    'duScroll',
    'timepickerPop',
    'ui.date',
    'angular-loading-bar']);

angular.module('PKBL').config(function ($routeProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    $routeProvider.when('/client_portal/dashboard', { templateUrl: 'app/dashboard/dashboard.html' });
    $routeProvider.when('/client_portal/lr_year', { templateUrl: 'app/dashboard/loss-ratio-year/loss-ratio-year.html' });
    $routeProvider.when('/client_portal/lr_year_oc', { templateUrl: 'app/dashboard/loss-ratio-year-oc/loss-ratio-year-oc.html' });
    $routeProvider.when('/client_portal/lr_month_oc', { templateUrl: 'app/dashboard/loss-ratio-month-oc/loss-ratio-month-oc.html' });

    $routeProvider.when('/client_portal/dss', { templateUrl: 'app/dashboard/dss/dss.html' });

    $routeProvider.when('/client_portal/risk_polis', { templateUrl: 'app/dashboard/risk-polis/risk-polis.html' });

    $routeProvider.when('/transaction/penyaluranDana', { templateUrl: 'app/transaction/penyaluran-dana-list/penyaluran-dana-list.html' });
    $routeProvider.when('/transaction/angsuran', { templateUrl: 'app/transaction/angsuran-list/angsuran-list.html' });
    $routeProvider.when('/master/pengusaha', { templateUrl: 'app/master/pengusaha/pengusaha-list.html' });
    $routeProvider.when('/master/jenisUsaha', { templateUrl: 'app/master/jenisUsaha/jenisUsaha-list.html' });
    $routeProvider.when('/master/jenisPinjaman', { templateUrl: 'app/master/jenisPinjaman/jenisPinjaman-list.html' });
    $routeProvider.when('/master/propinsi', { templateUrl: 'app/master/propinsi/propinsi-list.html' });
    $routeProvider.when('/master/wilayah', { templateUrl: 'app/master/wilayah/wilayah-list.html' });
    $routeProvider.when('/master/nomorPerkiraan', { templateUrl: 'app/master/nomorPerkiraan/nomorPerkiraan-list.html' });
    $routeProvider.when('/master/clusterPengusaha', { templateUrl: 'app/master/clusterPengusaha/clusterPengusaha-list.html' });
    /* Add New Routes Above */
    $routeProvider.otherwise({ redirectTo: '/' });

});

angular.module('PKBL')
    .run(function ($rootScope, $location, AuthenticationService, SessionService, ToastMessageService, cfpLoadingBar, IncidentService, $interval, ApplicationSettingService) {
        $rootScope.safeApply = function (fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.loginUrl = '/Web/login.html';
        cfpLoadingBar.start();
        $interval(function () {
            cfpLoadingBar.complete();
            window.location.reload();

        }, 15 * 60 * 1000);



        var checkLoginStatus = function (callbackIfSuccess) {
            var jsonResult = AuthenticationService.IsLoggedIn(function () {
                var isLoggedIn = jsonResult.data;
                if (isLoggedIn) {
                    var jsonResultUser = AuthenticationService.GetCurrentUser(function (){
                        var user = jsonResultUser.data;
                        if ($location.path() == null || $location.path() == '' || $location.path() == '/') {
                            window.location = "/Web/index.html#" + user.default_landing_page;
                        }
                        else {
                            window.location = "/Web/index.html#" + $location.$$url;
                        }
                    });
                } else {
                    if ($location.$$absUrl.indexOf("login") <= -1) {
                        if($location.$$absUrl.indexOf("createUser") <= -1){
                            if ($location.path() == null || $location.path() == '' || $location.path()) {
                                window.location = $rootScope.loginUrl + '#/';
                            }
                            else {
                                window.location = $rootScope.loginUrl + '#' + $location.$$url;
                            }
                        }
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
        checkLoginStatus();
    });
