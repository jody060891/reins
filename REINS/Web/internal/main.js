angular.module('PKBL')
    .controller('MainCtrl', function LoginCtrl($rootScope, $scope, $interval) {
        function refreshApp() {
            var host = document.getElementById('main-content-app');
            if(host) {
                var mainDiv = $("#main-content-app");
                mainDiv.empty();
                angular.element(host).empty();
            }
        }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                refreshApp();
            }
        );
        var autoSaveTimer;
        $rootScope.$on('autoSaveStart', function(event, data){
            var intervalMinute = data;
            autoSaveTimer = $interval(function(){
                $rootScope.$broadcast('doAutoSave');
            }, intervalMinute * 60 * 1000);
        });

        $rootScope.$on('autoSaveStop', function(){
            if (angular.isDefined(autoSaveTimer)) {
                $interval.cancel(autoSaveTimer);
                autoSaveTimer = undefined;
            }
        });

    });
