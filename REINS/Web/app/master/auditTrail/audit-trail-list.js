
angular.module('HITS')
    .controller('AuditTrailListCtrl', function AuditTrailListCtrl($scope, $modal, $timeout, $filter, $window, $location, ToastMessageService,
        UserAuditTrailService, UserAuditTrailReportService, LoadingScreenService, SessionService, UserAclSessionData) {
        SessionService.setAclSession(UserAclSessionData);
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_USER_MANAGEMENT_USER_VIEW']){
            $location.path('/unauthorized');
        }

        $scope.datePickerOpen = function (id) {
            $timeout(function () {
                $("#" + id).focus();
            });
        };

        $scope.isDateEnable = true;


        $scope.viewDetail = function (id) {
            $window.scrollTo(0, 0);
            $modal.open({
                templateUrl: 'app/master/auditTrail/auditTrail-detail/audit-trail-detail.html',
                controller: 'AuditTrailDetailCtrl',
                windowClass: 'modal-large',
                resolve: {
                    auditTrailId: function () {
                        return id;
                    }
                }
            });
        };

        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'action_date',
            is_sort_asc: false,
            total_data: 0,
            search: {
                keyword: '',
                fields: ['action_date', 'name', 'action', 'item_id']
            }
        };

        $scope.searchParam = {
          date_from: new Date(),
            date_to: new Date(),
            name: '',
            item_id: ''
        };

        $scope.Fetch = function () {
            $scope.SearchQuery.search.keyword = $scope.keyword;
            var jsonResult = UserAuditTrailService.FetchAllWithPagination(
                {
                    searchQuery: $scope.SearchQuery,
                    searchParam: $scope.searchParam
                }, function () {
                $scope.userActivities = [];
                var dataUserActivities = jsonResult.data.list;
                $scope.userActivities = dataUserActivities;
                $scope.SearchQuery.total_data = jsonResult.data.totalData;
            });
        };

        $scope.onSearch = function () {
            $scope.Fetch();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
            //console.log($scope.SearchQuery);
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

        $scope.Fetch();

        $scope.onGenerateReport = function (type) {
            var valid = true;

            if ($scope.searchParam.date_from > $scope.searchParam.date_to) {
                valid = false;
                $scope.validation.date_period = true;
            }
            else {
                $scope.searchParam.date_from= $filter('momentDateFilter')($scope.searchParam.date_from, 'YYYY-MM-DD');
                $scope.searchParam.date_to = $filter('momentDateFilter')($scope.searchParam.date_to, 'YYYY-MM-DD');
            }

            $scope.pdfLink = "";
            if (valid) {
                $scope.action = true;
                LoadingScreenService.showLoading();
                if (type == 'Xls') {
                    var jsonResult = UserAuditTrailReportService.GenerateXls($scope.searchParam, function () {
                        var filename = jsonResult.data;
                        $window.location.assign("/File/DownloadXls?name=" + encodeURIComponent(filename));
                        $scope.action = false;
                        LoadingScreenService.hideLoading();
                    });
                }
                else {
                    var jsonResult = UserAuditTrailReportService.GeneratePdf($scope.searchParam, function () {
                        var filename = jsonResult.data;
                        $window.location.assign("/File/DownloadPdf?name=" + encodeURIComponent(filename));
                        $scope.action = false;
                        LoadingScreenService.hideLoading();
                    });
                }
            }
            //var result = SacScoreReportService.GeneratePdf($scope.param, function(){
            //
            //});
        };
    });
  