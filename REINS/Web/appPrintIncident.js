angular.module('HITS', [
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
    'ui.date']);

angular.module('HITS').config(function ($routeProvider) {
    /* Add New Routes Above */
    $routeProvider.otherwise({ redirectTo: '/' });

});

angular.module('HITS')
    .run(function ($rootScope, $location, AuthenticationService, SessionService, IncidentService, $interval, ApplicationSettingService) {
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

        var checkLoginStatus = function (callbackIfSuccess) {
            var jsonResult = AuthenticationService.IsLoggedIn(function () {
                var isLoggedIn = jsonResult.data;
                if (!isLoggedIn) {
                    if ($location.$$absUrl.indexOf("login") <= -1) {
                        if ($location.path() == null || $location.path() == '' || $location.path()) {
                            window.location = $rootScope.loginUrl + '#/';
                        }
                        else {
                            window.location = $rootScope.loginUrl + '#' + $location.$$url;
                        }
                    }
                }
            });
        };
        //
        //var jsonSetting = ApplicationSettingService.FetchOneByKey({keyValue: 'MAINTENANCE_MODE'},
        //    function() {
        //        var isMaintenance = jsonSetting.data.setting_value_default;
        //        if (isMaintenance == "true"){
        //            window.location = '/Web/maintenance.html#/';
        //        }
        //        else {
        //            checkLoginStatus();
        //        }
        //    });
    });
