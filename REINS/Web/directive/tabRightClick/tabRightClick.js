angular.module('PKBL')
    .directive('tabRightClick',['$parse', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.tabRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    }]);