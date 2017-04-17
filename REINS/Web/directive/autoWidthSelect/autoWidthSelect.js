angular.module('PKBL').directive('autoWidthSelect', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }
            var el;

            element.each(function() {
                el = $(this);
                el.data("origWidth", el.outerWidth()) // IE 8 can haz padding
            });

            element.bind('click', function (event) {
                element.css("width", "auto");
            });

            element.bind("blur change", function () {
                element.css("width", el.data("origWidth"));
            });
        }
    };
});