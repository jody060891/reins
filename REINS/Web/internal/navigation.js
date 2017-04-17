angular.module('PKBL')
    .controller('NavigationCtrl',
        function NavigationCtrl($rootScope, $attrs, $scope, $resource, $location, ModuleService, AuthenticationService, UserSessionData) {
            $scope.isShowHome = true;
            $scope.navScope = $scope;
            var user = UserSessionData;


            $scope.onMenuClick = function (moduleRoute) {
                //alert(moduleRoute);
                if (moduleRoute != null && moduleRoute !== "" && moduleRoute !== "undefined") {
                    $location.path(moduleRoute);
                }
            };
            var a = angular.element(document.getElementsByClassName("menu-click"));
            angular.forEach(a, function(el){
                if(el.getAttribute("data-route") == $location.path()){
                    el.setAttribute("class", "menu-click active");
                    var maxLooping = 2;
                    for(var i = 0; i < maxLooping; i++){
                        if(i == 0){
                            var parent = el.parentNode;
                        }else{
                            parent = parent.parentNode;
                        }
                        if(parent.getAttribute("class") == "submenu")
                            parent.parentNode.setAttribute("class", "has-submenu active");
                    }
                }

            });

            $scope.test = function(){
                console.log("aa");
            }


            $scope.menuClicked = function(event){
                var activeElement = angular.element(document.getElementsByClassName("active"));
                angular.forEach(activeElement, function(el){
                    if(el.getAttribute("class").indexOf("has-submenu") >= 0){
                        el.setAttribute("class", "has-submenu");
                    }else{
                        el.setAttribute("class", "menu-click");
                    }
                });
                if(event.target.parentNode.getAttribute("class") == "menu-click"){
                    event.target.parentNode.setAttribute("class", "menu-click active");
                }else{
                    event.target.setAttribute("class", "menu-click active");
                    var maxLooping = 2;
                    for(var i = 0; i < maxLooping; i++){
                        if(i == 0){
                            var parent = event.target.parentNode;
                        }else{
                            parent = parent.parentNode;
                        }
                        if(parent.getAttribute("class") == "submenu")
                            parent.parentNode.setAttribute("class", "has-submenu active");
                    }
                }


            };

            $scope.onHomeClick = function(){
                var user = UserSessionData;
                if ($location.path() == user.default_landing_page) {
                    window.location.reload();
                }
                $location.path(user.default_landing_page);
            }
        });
