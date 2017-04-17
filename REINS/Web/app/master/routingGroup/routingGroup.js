angular.module('HITS').controller('RoutinggroupCtrl', function ($scope, $modal, $location, RoutingGroupService,
    RoutingGroupFormService, SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    if (!$scope.currentAcl['SM_ROUTING_GROUP_VIEW']){
        $location.path('/unauthorized');
    }

    var openModal = function (data) {
        $modal.open({
            templateUrl: 'app/master/routingGroup/routingGroupForm/routingGroupForm.html',
            controller: 'RoutinggroupformCtrl',
            backdrop: true,
            resolve: {
                routingGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openUserForm = function (data) {
        
        //$modal.open({
        //    templateUrl: 'app/master/routingGroup/routingGroupUser/routingGroupUser.html',
        //    controller: 'RoutinggroupuserCtrl',
        //    backdrop: true,
        //    windowClass: 'modal-large',
        //    resolve: {
        //        routingGroup: function () {
        //            return data;
        //        }
        //    }
        //}).result.then(function (result) {
        //    $scope.Fetch();
        //});
        RoutingGroupFormService.set(data);
        $location.path("/routingGroupUser");
    };

    $scope.openLocationForm = function (data) {

        $modal.open({
            templateUrl: 'app/master/routingGroup/locationForm/AddLocationForm.html',
            controller: 'AddlocationformCtrl',
            resolve: {
                routingGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.onCreateNew = function () {
        openModal({});
    };

    $scope.onRowEdit = function (data) {
        openModal(angular.copy(data));
    };

    $scope.onRowDelete = function (data) {
        var sel = confirm("Are you sure you want to delete the Routing Group [" + data.name + "] ?");
        if (sel) {
            var jsonResult = RoutingGroupService.Delete(data, function () {
                $scope.Fetch();
            });
        }
    };

    $scope.SearchQuery = {
        page: 1,
        row_per_page: 10,
        sort_by: 'name',
        is_sort_asc: true,
        total_data: 0,
        search: {
            keyword: $scope.keyword,
            fields: ['name', 'Institution.institution_name']
        }
    };

    $scope.Fetch = function () {
        $scope.SearchQuery.search.keyword = $scope.keyword;
        var jsonResult = RoutingGroupService.FetchAllWithPagination($scope.SearchQuery, function () {
            $scope.routingGroups = jsonResult.data.list;
            $scope.SearchQuery.total_data = jsonResult.data.totalData;
        });
    };

    $scope.onSearch = function () {
        $scope.Fetch();
    };

    $scope.onPageChanged = function (page) {
        $scope.SearchQuery.page = page;
        $scope.Fetch();
    };

    $scope.onSort = function (sortField) {
        if ($scope.SearchQuery.sort_by == sortField)
            $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
        else
            $scope.SearchQuery.is_sort_asc = true;
        $scope.SearchQuery.sort_by = sortField;
        $scope.Fetch();
    };

    $scope.onKeyPress = function ($event) {
        if ($event.keyCode === 13) {
            $scope.onSearch();
        }
    };

    $scope.Fetch();
});