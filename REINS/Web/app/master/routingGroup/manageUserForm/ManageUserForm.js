angular.module('HITS').controller('ManageuserformCtrl', function ($scope, UserService, routingGroup, RoutingGroupService, $modalInstance, UserSessionData) {

    $scope.routingGroup = routingGroup;

    var hash = {};
    angular.forEach($scope.routingGroup.RoutingUsers, function (user, k) {
        hash[user.user_id] = user;
    });

    var jsonResult = UserService.FetchAll({
        institutionId: UserSessionData.institution_id
    }, function () {
        $scope.users = jsonResult.data;

        angular.forEach($scope.users, function (user, k) {
            if (!hash[user.user_id]) {
                routingGroup.RoutingUsers.push({
                    routing_group_id : routingGroup.routing_group_id,
                    user_id : user.user_id,
                    is_active: false,
                    User: user
                });
            }
        });
    });

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSave = function (data) {
        toggleAction();

        var users = angular.copy($scope.routingGroup.RoutingUsers);
        $scope.routingGroup.Users = [];

        angular.forEach(users, function (user, k) {
            if (user.routing_user_id || user.is_active) {
                $scope.routingGroup.RoutingUsers.push(user);
            }
        });

        var result = RoutingGroupService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});