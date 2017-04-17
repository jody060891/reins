angular.module('HITS')
    .controller('DisciplineListCtrl',
      function DisciplineListCtrl($rootScope, $scope, $resource, $location, $modal, DisciplineService,
          ToastMessageService, SessionService, UserAclSessionData) {
          SessionService.setAclSession(UserAclSessionData);
          SessionService.setAcltoScope($scope);
          if (!$scope.currentAcl['SM_MASTER_DATA_DISCIPLINE_VIEW']){
              $location.path('/unauthorized');
          }

          var openModal = function (data) {
              $modal.open({
                  templateUrl: 'app/master/discipline/discipline-form/discipline-form.html',
                  controller: 'DisciplineFormCtrl',
                  resolve: {
                      disciplineData: function () {
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
              sort_by: 'discipline_name',
              is_sort_asc: true,
              total_data: 0,
              search: {
                  keyword: $scope.keyword,
                  fields: ['discipline_name', 'discipline_code']
              }
          };

          $scope.Fetch = function () {
              $scope.SearchQuery.search.keyword = $scope.keyword;
              var jsonResult = DisciplineService.FetchAllWithPagination($scope.SearchQuery,function () {
                  $scope.disciplines = [];
                  var data_disciplines = jsonResult.data.list;
                  var i = 0;
                  $scope.disciplines = data_disciplines;
                  $scope.SearchQuery.total_data = jsonResult.data.totalData

                  //$rootScope.hideLoading();
              });
          };

          $scope.onCreateNew = function () {

              openModal({});
          };

          $scope.onRowEdit = function (disciplineData) {

              openModal(angular.copy(disciplineData));
          };

          $scope.onRowDelete = function (disciplineData) {
              var sel = confirm("Are you sure you want to delete the Discipline [" + disciplineData.discipline_name + "] ?");
              if (sel) {
                  var jsonResult = DisciplineService.Delete(disciplineData, function () {
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
