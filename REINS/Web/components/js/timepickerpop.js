/**
 * Anularjs Module for pop up timepicker
 */
angular.module('timepickerPop', [ 'ui.bootstrap' ])
.directive("timeFormat", function($filter) {
      return {
        restrict : 'A',
        require : 'ngModel',
        scope : {
          showMeridian : '='
        },
        link : function(scope, element, attrs, ngModel) {
            var parseTime = function(viewValue) {

            if (!viewValue) {
              ngModel.$setValidity('time', true);
              return null;
            } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
              ngModel.$setValidity('time', true);
              return viewValue;
            } else if (angular.isString(viewValue)) {
              var timeRegex = /^(0?[0-9]|1[0-2]):[0-5][0-9] ?[a|p]m$/i;
              if (!scope.showMeridian) {
                timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
              }
              if (!timeRegex.test(viewValue)) {
                ngModel.$setValidity('time', true);
                return undefined;
              } else {
                ngModel.$setValidity('time', true);
                var date = new Date();
                var sp = viewValue.split(":");
                var apm = sp[1].match(/[a|p]m/i);
                if (apm) {
                  sp[1] = sp[1].replace(/[a|p]m/i, '');
                  if (apm[0].toLowerCase() == 'pm') {
                    sp[0] = sp[0] + 12;
                  }
                }
                date.setHours(sp[0], sp[1]);
                return date;
              }
            } else {
              ngModel.$setValidity('time', true);
              return undefined;
            }
          };

          ngModel.$parsers.push(parseTime);

          var showTime = function(data) {
            parseTime(data);
            var timeFormat = (!scope.showMeridian) ? "HH:mm" : "hh:mm a";
            return $filter('date')(data, timeFormat);
          };
          ngModel.$formatters.push(showTime);
          //scope.$watch('showMeridian', function(value) {
          //  var myTime = ngModel.$modelValue;
          //  if (myTime) {
          //    element.val(showTime(myTime));
          //  }
          //
          //});

        }
      };
})

.directive('timepickerPop', function($document) {
    return {
        restrict : 'EA',
        transclude : false,
        scope : {
            inputTime : "=",
            showMeridian: "=",
            ngRequired: "=",
            fb: "=",
            ngDisabled: "=",
            ngDate: "="
        },
        controller : function($scope, $element) {
            $scope.isOpen = false;

            $scope.toggle = function() {
                $scope.isOpen = !$scope.isOpen;
            };

            $scope.open = function() {
                $scope.isOpen = true;
            };

            $scope.setTime = function () {
                if(!$scope.inputTime) $scope.inputTime = new Date();
            };

            $scope.validateTime = function () {
                if (!$scope.ngDate || !$scope.inputTime) return;
                var today = new Date();
                var date = angular.copy($scope.ngDate);

                if (typeof $scope.ngDate == 'string') {
                    if (date.length == 10){
                        var day = date.substr(0,2);
                        var month = date.substr(3,2) - 1;
                        var year = date.substr(6, 4);
                        date = new Date(year, month, day);
                    }
                    else {
                        date = new Date(date);
                    }
                }
                if (typeof $scope.inputTime == 'string') $scope.inputTime = new Date($scope.inputTime);

                var combine = new Date(date.getFullYear(), date.getMonth(), date.getDate(), $scope.inputTime.getHours(), $scope.inputTime.getMinutes());
                if (combine > today) {
                    $scope.inputTime = null;
                }
            };

            var unregValidateWatch1 = $scope.$watch('inputTime', function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    $scope.validateTime();
                }
            });

            var unregValidateWatch2 = $scope.$watch('ngDate', function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    $scope.validateTime();
                }
            });

            $scope.$on('$destroy', function () {
                unregValidateWatch1();
                unregValidateWatch2();
            });
        },
        link : function(scope, element, attrs) {
            element.bind('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            $document.bind('click', function(event) {
                scope.$apply(function() {
                    scope.isOpen = false;
                });
            });
            scope.$on('$destroy', function () {
                $document.unbind('click');
            });

        },
        template: "<input ng-required='ngRequired' ng-disabled='ngDisabled' type='text' ng-model='inputTime' time-format-input  time-format show-meridian='showMeridian' ng-focus='setTime(); open()' ng-class='{ fb: fb, \"fb-time\": fb, \"form-control\": !fb }' maxlength='5' />"
            + "  <div class='input-group-btn' ng-class='{open:isOpen, \"fb-group-btn\":fb}'> "
            + "          <div class='dropdown-menu pull-right'> "
            + "            <div timepicker ng-model='inputTime' show-meridian='showMeridian' mousewheel='false'></div> "
            + "           </div> "
            + "    <button ng-disabled='ngDisabled' ng-if='true' style='width:100%' type='button' class='btn btn-default' data-toggle='dropdown' ng-click='toggle()'> "
            + "        <i class='fa fa-clock-o'></i></button> "
            + "    <button ng-disabled='ngDisabled' ng-if='false' style='width:100%' type='button' class='btn btn-default' data-toggle='dropdown' ng-click='inputTime" + "=null'> "
            + "        <img src='/Web/img/fa-times.png' /></button> "
            + "  </div>"
      };
})
    .directive('fbTimePicker', function($document) {
        return {
            restrict : 'EA',
            transclude : false,
            scope : {
                inputTime : "=",
                ngRequired: "=",
                ngDisabled: "=",
                ngDate: "="
            },
            controller : function($scope, $element) {
                $scope.isOpen = false;

                $scope.toggle = function() {
                    $scope.isOpen = !$scope.isOpen;
                };

                $scope.open = function() {
                    $scope.isOpen = true;
                };

                $scope.setTime = function () {
                    if(!$scope.inputTime) $scope.inputTime = new Date();
                };

                $scope.validateTime = function () {
                    if (!$scope.ngDate || !$scope.inputTime) return;
                    var today = new Date();
                    var date = angular.copy($scope.ngDate);

                    if (typeof $scope.ngDate == 'string') {
                        if (date.length == 10){
                            var day = date.substr(0,2);
                            var month = date.substr(3,2) - 1;
                            var year = date.substr(6, 4);
                            date = new Date(year, month, day);
                        }
                        else {
                            date = new Date(date);
                        }
                    }
                    if (typeof $scope.inputTime == 'string') $scope.inputTime = new Date($scope.inputTime);

                    var combine = new Date(date.getFullYear(), date.getMonth(), date.getDate(), $scope.inputTime.getHours(), $scope.inputTime.getMinutes());
                    if (combine > today) {
                        $scope.inputTime = null;
                    }
                };

                $scope.$watch('inputTime', function (newValue, oldValue) {
                    if (newValue && newValue !== oldValue) {
                        $scope.validateTime();
                    }
                });

                $scope.$watch('ngDate', function (newValue, oldValue) {
                    if (newValue && newValue !== oldValue) {
                        $scope.validateTime();
                    }
                });
            },
            link : function(scope, element, attrs) {
                element.bind('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                $document.bind('click', function(event) {
                    scope.$apply(function() {
                        scope.isOpen = false;
                    });
                });

            },
            template: "<input ng-required='ngRequired' ng-disabled='ngDisabled' type='text' ng-model='inputTime' time-format show-meridian='false' ng-focus='setTime(); open();' class='fb fb-time' />"
            + "  <div class='input-group-btn' ng-class='{open:isOpen}'> "
            + "          <div class='dropdown-menu pull-right'> "
            + "            <div timepicker ng-model='inputTime' show-meridian='false' mousewheel='false'></div> "
            + "           </div> "
            + "  </div>"
        };
    });

