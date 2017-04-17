angular.module('PKBL')
    .directive('sidebarTree', function($compile, $log) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                attrs.$set("ngTrim", "false");
                var elementClass = attrs.sidebarTreeChildren;
                elem.on('click', function(event) {
                    console.log("al");
                    $(this).find('i:first').toggleClass("fa-minus-circle");
                    $("."+elementClass).toggle();
                });

                // $(document).on("click","#left ul.nav li.parent > a > span.sign", function(){
                //     $(this).find('i:first').toggleClass("icon-minus");
                // });
                //
                // // Open Le current menu
                // $("#left ul.nav li.parent.active > a > span.sign").find('i:first').addClass("icon-minus");
                // $("#left ul.nav li.current").parents('ul.children').addClass("in");
            }
        };
    });