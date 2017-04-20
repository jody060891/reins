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
    'chart.js',
    'dx',
    'angular.morris',
    'angular-loading-bar',
    'angucomplete-alt']);

angular.module('PKBL').config(function ($routeProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    $routeProvider.when('/landingPage', { templateUrl: 'app/landing-page/landing-page.html' });
    $routeProvider.when('/ATK', { templateUrl: 'app/transaction/activaAtk/atk/atk-list.html' });
    $routeProvider.when('/OPNCOVER', {templateUrl: 'app/transaction/facultativeInwardModule/facultativeInwardInput/openCoverDetails/open-cover-details-list.html'});
    $routeProvider.when('/FACULPRADM', {templateUrl: 'app/transaction/facultativeInwardModule/facultativeInwardInput/facultativeRiskDetailsPropor/facultative-risk-details-propor-list.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({ redirectTo: '/landingPage' });

}).config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    //ChartJsProvider.setOptions({ colors : [ '#803690', '#e60000', '#00ADF9', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    //// Configure all line charts
    ChartJsProvider.setOptions('Line', {
        animation: false,
        fill: false,
        maintainAspectRatio: false
    });
}]);
angular.module('PKBL')
    .run(function ($rootScope, SessionService, $location, ApplicationStatusService) {
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



        if($location.$$search.isElo && $location.$$search.isElo == "true"){
            var status = {
                userId : $location.$$search.userId,
                isElo : $location.$$search.isElo
            }
            ApplicationStatusService.set(status);
            SessionService.setStatus(status);
            $("#reinsHeader").hide();
            $("#sidebar").hide();
            $("#content").removeClass();
            $("#content").addClass("col-md-12 col-sm-12");
        }else{
            SessionService.scheduleReminder();
        }


    });
