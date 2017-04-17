angular.module('PKBL').directive('loadingScreen', function () {
	return {
		restrict: 'EA',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/loadingScreen/loadingScreen.html',
		link: function (scope, element, attrs, fn) {

		},
		controller: function ($scope, LoadingScreenService) {
		    $scope.isShown = false;
		    LoadingScreenService.registerCallback(function() {
		        $scope.isShown = LoadingScreenService.getIsShow();
		    });
		}
	};
});
