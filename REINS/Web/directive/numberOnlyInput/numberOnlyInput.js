angular.module('PKBL')
    .directive('numberOnlyInput', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    var clean = "";
                    if (val != null && val.length > 0) {
                        clean = val.replace(/[^0-9]+/g, '');
                        if (val !== clean) {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                        }
                    }
                    if (attrs.max && clean != "" && parseInt(clean) > parseInt(attrs.max)) {
                        clean = attrs.max;
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }

                    if (attrs.min && clean != "" && clean < attrs.min) {
                        clean = attrs.min;
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }


                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    })
    .directive('numberPhoneOnlyInput', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    var clean = val.replace(/[^-+0-9]+/g, '');
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    })
    .directive('moneyFormatInput', function () {
        return {
            require: '^ngModel',
            link: function (scope, element, attrs, ngModelCtrl, ngModel) {
                if (!ngModelCtrl) {
                    return;
                }



                ngModelCtrl.$parsers.push(function (val) {
                    var newClean = val.replace(/[^.0-9]+/g, '').replace(/,/g , "");

                    var clean = newClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var numbers = clean.split(".");
                    if(numbers.length > 1){
                        var decimal = numbers[1];
                        decimal = decimal.replace(/[^0-9]+/g, '');

                        clean = numbers[0]+"."+decimal;
                    }
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return newClean;
                });

                scope.parseMoneyFormat = function(val){


                };
                //
                // scope.parseMoenyFormat(ngModelCtrl.$modelValue);

                var defaultValue = attrs.moneyFormatInput;


                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    })
    .directive('numberOnlyInputWithSlash', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    var clean = val.replace(/[^0-9\/]+/g, '');
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    });