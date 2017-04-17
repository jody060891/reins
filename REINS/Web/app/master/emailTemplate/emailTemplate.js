angular.module('HITS').controller('EmailtemplateCtrl', function ($scope, $modal, $location, EmailTemplateService,
    SessionService, UserAclSessionData) {
    SessionService.setAclSession(UserAclSessionData);
    SessionService.setAcltoScope($scope);
    if (!$scope.currentAcl['SM_MASTER_DATA_SM_INCIDENT_SETUP_INCIDENT_DATA_VIEW']){
        $location.path('/unauthorized');
    }

    var openModal = function (data) {
        $modal.open({
            templateUrl: 'app/master/emailTemplate/emailTemplateForm/emailTemplateForm.html',
            controller: 'EmailtemplateformCtrl',
            windowClass: 'modal-fullscreen',
            resolve: {
                emailTemplate: function () {
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
        var sel = confirm("Are you sure you want to delete the Email Template [" + data.name + "] ?");
        if (sel) {
            var jsonResult = EmailTemplateService.Delete(data, function () {
                $scope.Fetch();
            });
        }
    };
    $scope.SearchQueryTemplate = {
        page: 1,
        row_per_page: 10,
        sort_by: 'email_template_id',
        is_sort_asc: true,
        total_data: 0,
        search: {
            keyword: $scope.keywordTemplate,
            fields: ['action_description']
        }
    };

    $scope.Fetch = function () {
        $scope.SearchQueryTemplate.search.keyword = $scope.keywordTemplate;
        var jsonResult = EmailTemplateService.FetchAllWithPagination($scope.SearchQueryTemplate, function () {
            $scope.emailTemplates = jsonResult.data.list;
            $scope.SearchQueryTemplate.total_data = jsonResult.data.totalData;
            //console.log(jsonResult.data);
        });
    };


    $scope.onSearchTemplate = function () {
        $scope.Fetch();
    };

    $scope.onKeyPress = function ($event) {
        if ($event.keyCode === 13) {
            $scope.onSearchTemplate();
        }
    };

    $scope.onPageChanged = function (page) {
        $scope.SearchQueryTemplate.page = page;
        //console.log($scope.SearchQuery);
        $scope.Fetch();
    };

    $scope.onSort = function (sortField) {
        if ($scope.SearchQueryTemplate.sort_by == sortField)
            $scope.SearchQueryTemplate.is_sort_asc = !$scope.SearchQueryTemplate.is_sort_asc;
        else
            $scope.SearchQueryTemplate.is_sort_asc = true;
        $scope.SearchQueryTemplate.sort_by = sortField;
        $scope.Fetch();
    };
    $scope.Fetch();
});