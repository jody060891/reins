angular.module('HITS').controller('EmailQueueCtrl', function ($scope, $modal, $location, EmailQueueService,
    SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    if (!$scope.currentAcl['SM_MASTER_DATA_SM_INCIDENT_SETUP_INCIDENT_DATA_VIEW']){
        $location.path('/unauthorized');
    }


    $scope.SearchQueryQueue = {
        page: 1,
        row_per_page: 10,
        sort_by: 'last_sent_attempt',
        is_sort_asc: false,
        total_data: 0,
        search: {
            keyword: $scope.keywordQueue,
            fields: ['to']
        }
    };

    $scope.Fetch = function () {
        $scope.SearchQueryQueue.search.keyword = $scope.keywordQueue;
        var jsonResult = EmailQueueService.FetchAllWithPagination($scope.SearchQueryQueue, function () {
            $scope.emailQueue = jsonResult.data.list;
            $scope.SearchQueryQueue.total_data = jsonResult.data.totalData;
            //console.log(jsonResult.data);
        });
    };


    $scope.onSearchQueue = function () {
        $scope.Fetch();
    };

    $scope.onKeyPress = function ($event) {
        if ($event.keyCode === 13) {
            $scope.onSearchQueue();
        }
    };

    $scope.onPageChanged = function (page) {
        $scope.SearchQueryQueue.page = page;
        //console.log($scope.SearchQuery);
        $scope.Fetch();
    };

    $scope.onSort = function (sortField) {
        if ($scope.SearchQueryQueue.sort_by == sortField)
            $scope.SearchQueryQueue.is_sort_asc = !$scope.SearchQueryQueue.is_sort_asc;
        else
            $scope.SearchQueryQueue.is_sort_asc = true;
        $scope.SearchQueryQueue.sort_by = sortField;
        $scope.Fetch();
    };
    $scope.Fetch();
});