angular.module('PKBL').directive('userActivityWatcher', function(SessionService) {
    return {
        scope: {},
        restrict: 'A',
        link: function(scope, element, attrs, fn) {
            var ns = 'userActivityWatcher';
            var events = [];
            var eventsWithNs = [];
            $.each(attrs.userActivityWatcher.split(" "), function(key, event) {
                if (event != "") {
                    events.push(event);
                    eventsWithNs.push(event + '.' + ns);
                }
            });
            var registerEvent = function() {
                $(document).on(eventsWithNs.join(' '), function() {
                    SessionService.resetReminder();
                });
            };
            setInterval(function() {
                var docEvents = $._data(document, 'events');
                var found = false;
                $.each(events, function(key, event) {
                    found = false;
                    if (docEvents[event]) {
                        $.each(docEvents[event], function(key, evtObj) {
                            if (evtObj.namespace == ns) {
                                found = true;
                                return false;
                            }
                        });
                    }
                    return found;
                });
                if (!found) {
                    $(document).unbind(".userActivityWatcher");
                    registerEvent();
                }
            }, 1000);
            registerEvent();
        }
    };
});
