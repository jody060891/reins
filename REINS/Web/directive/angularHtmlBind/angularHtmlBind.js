angular.module('PKBL')
    .directive('angularHtmlBind', function ($compile) {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.angularHtmlBind, function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    elm.children().empty();
                    elm.children().remove();
                    elm.html(newValue);
                    $compile(elm.contents())(scope.$eval(attrs.compileScope));
                    $('.nav-incident-detail').onePageNav();

                }
            });
        };
    })
    .directive('angularHtmlBindArray', function ($compile, $interval, LoadingScreenService) {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.angularHtmlBindArray, function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    LoadingScreenService.showLoading();
                    var iCounter = 0;
                    var iMaxCounter = newValue.length;
                    elm.children().empty();
                    elm.children().remove();

                    if (iMaxCounter > 0) {
                        var loop = $interval(function () {
                            var section = newValue[iCounter];
                            iCounter++;
                            var id = 'section' + iCounter;
                            var ng_attr_tabindex = iCounter;
                            var $div = $("<div>", { id: id, "ng-attr-tabindex": ng_attr_tabindex });
                            elm.append($div);
                            var newDiv = $div;
                            newDiv.html(section.template_section);
                            $compile(newDiv.contents())(scope.$eval(attrs.compileScope));
                            if (iCounter == iMaxCounter) {
                                LoadingScreenService.hideLoading();
                                if (angular.isDefined(loop)) {
                                    $interval.cancel(loop);
                                    loop = undefined;
                                }
                            }
                        }, 20, iMaxCounter);
                    }


                    //angular.forEach(newValue, function(section, key){
                    //    iCounter++;
                    //    var id = 'section' + iCounter;
                    //    var $div = $("<div>", {id: id});
                    //    elm.append($div);
                    //    var newDiv = $div;
                    //    newDiv.html(section.template_section);
                    //    $compile(newDiv.contents())(scope.$parent.$parent);
                    //});
                }
            });
        };
    })
    .directive('angularHtmlBindTemplate', function ($compile) {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.angularHtmlBindTemplate, function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    elm.children().empty();
                    elm.children().remove();
                    elm.html(newValue);
                    $compile(elm.contents())(scope.$eval(attrs.compileScope));
                }
            });
        };
    })
    .directive('angularForceHtmlBindTemplate', function ($compile) {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.angularForceHtmlBindTemplate, function (newValue, oldValue) {
                elm.children().empty();
                elm.children().remove();
                elm.html(newValue);

                if((scope.$eval(attrs.compileScope)))
                    $compile(elm.contents())(scope.$eval(attrs.compileScope));
            });
        };
    });