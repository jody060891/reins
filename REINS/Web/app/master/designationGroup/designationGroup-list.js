angular.module('HITS')
    .controller('DesignationGroupListCtrl',
      function DesignationGroupListCtrl($rootScope, $scope, $resource, $location, $modal, DesignationGroupService,
          ToastMessageService, SessionService, UserAclSessionData) {
          SessionService.setAclSession(UserAclSessionData);
          SessionService.setAcltoScope($scope);
          if (!$scope.currentAcl['SM_MASTER_DATA_DESIGNATION_GROUP_VIEW']){
              $location.path('/unauthorized');
          }

          var openModal = function (data) {
              $modal.open({
                  templateUrl: 'app/master/designationGroup/designationGroup-form/designationGroup-form.html',
                  controller: 'DesignationGroupFormCtrl',
                  resolve: {
                      designationGroupData: function () {
                          return data;
                      }
                  }
              }).result.then(function (result) {
                  // ToastMessageService.addAlerts('Test');
                  $scope.Fetch();
              });
          };

          $scope.SearchQuery = {
              page: 1,
              row_per_page: 10,
              sort_by: 'designation_group_name',
              is_sort_asc: true,
              total_data: 0,
              search: {
                  keyword: $scope.keyword,
                  fields: ['designation_group_name']
              }
          };

          $scope.Fetch = function () {
              $scope.SearchQuery.search.keyword = $scope.keyword;
              var jsonResult = DesignationGroupService.FetchAllWithPagination($scope.SearchQuery,function () {
                  $scope.designationGroups = [];
                  var data_designationGroups = jsonResult.data.list;
                  var i = 0;
                  $scope.designationGroups = data_designationGroups;
                  $scope.SearchQuery.total_data = jsonResult.data.totalData;


                  //$rootScope.hideLoading();
              });
          };

          $scope.onCreateNew = function () {

              openModal({});
          };

          $scope.onRowEdit = function (designationGroupData) {

              openModal(angular.copy(designationGroupData));
          };

          $scope.onRowDelete = function (designationGroupData) {
              var sel = confirm("Are you sure you want to delete the Designation Group [" + designationGroupData.designation_group_name + "] ?");
              if (sel) {
                  var jsonResult = DesignationGroupService.Delete(designationGroupData, function () {
                      $scope.Fetch();
                  });
              }
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


          $scope.onKeyPress = function ($event) {
              if ($event.keyCode === 13) {
                  $scope.onSearch();
              }
          };

          $scope.Fetch();
      });
