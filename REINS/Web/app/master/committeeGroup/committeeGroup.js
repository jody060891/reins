angular.module('HITS').controller('CommitteegroupCtrl', function ($scope, $modal, $location, CommitteeGroupService,
    SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    if (!$scope.currentAcl['SM_ROUTING_GROUP_VIEW']){
        $location.path('/unauthorized');
    }


    var openModal = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeGroupForm/committeeGroupForm.html',
            controller: 'CommitteegroupformCtrl',
            windowClass: 'modal-medium',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openUserForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeUserForm/committeeUserForm.html',

            controller: 'CommitteeuserformCtrl',
            resolve: {
                committeeGroupId: function () {
                    return data.committee_group_id;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openDisciplineForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeDisciplineForm/committeeDisciplineForm.html',

            controller: 'CommitteedisciplineformCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openDepartmentForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeDepartmentForm/committeeDepartmentForm.html',

            controller: 'CommitteedepartmentformCtrl',
            resolve: {
                committeeGroup: function () {
                    return data;
                }
            }
        }).result.then(function (result) {
            $scope.Fetch();
        });
    };

    $scope.openLocationForm = function (data) {
        $modal.open({
            templateUrl: 'app/master/committeeGroup/committeeLocationForm/committeeLocationForm.html',

            controller: 'CommitteelocationformCtrl',
            resolve: {
                committeeGroup: function () {
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
        var sel = confirm("Are you sure you want to delete the Committee Group [" + data.name + "] ?");
        if (sel) {
            var jsonResult = CommitteeGroupService.Delete(data, function () {
                $scope.Fetch();
            });
        }
    };
    $scope.SearchQueryCommittee = {
        page: 1,
        row_per_page: 10,
        sort_by: 'name',
        is_sort_asc: true,
        total_data: 0,
        search: {
            keyword: $scope.keywordCommittee,
            fields: ['name', 'IncidentType.incident_type_name']
        }
    };

    $scope.Fetch = function () {
        $scope.SearchQueryCommittee.search.keyword = $scope.keywordCommittee;
        var jsonResult = CommitteeGroupService.FetchAllWithPagination($scope.SearchQueryCommittee, function () {
            $scope.committeeGroups = jsonResult.data.list;
            $scope.SearchQueryCommittee.total_data = jsonResult.data.totalData;

        });
    };

   
    $scope.onSearchCommittee = function () {
        $scope.Fetch();
    };

    $scope.onKeyPress = function ($event) {
        if ($event.keyCode === 13) {
            $scope.onSearchCommittee();
        }
    };

    $scope.onPageChanged = function (page) {
        $scope.SearchQueryCommittee.page = page;
        //console.log($scope.SearchQuery);
        $scope.Fetch();
    };

    $scope.onSort = function (sortField) {
        if ($scope.SearchQueryCommittee.sort_by == sortField)
            $scope.SearchQueryCommittee.is_sort_asc = !$scope.SearchQueryCommittee.is_sort_asc;
        else
            $scope.SearchQueryCommittee.is_sort_asc = true;
        $scope.SearchQueryCommittee.sort_by = sortField;
        $scope.Fetch();
    };
    $scope.Fetch();
});