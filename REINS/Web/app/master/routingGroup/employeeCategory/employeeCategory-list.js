angular.module('HITS')
    .controller('EmployeeCategoryListCtrl',
    function EmployeeCategoryListCtrl($rootScope, $scope, $resource, $location, $modal, EmployeeCategoryService, ToastMessageService) {
        var openModal = function (data) {
            $modal.open({
                templateUrl: 'app/master/employeeCategory/employeeCategory-form/employeeCategory-form.html',
                controller: 'EmployeeCategoryFormCtrl',
                resolve: {
                    employeeCategoryData: function () {
                        return data;
                    }
                }
            }).result.then(function (result) {
                // ToastMessageService.addAlerts('Test');
                $scope.Fetch();
            });
        };
        $scope.Fetch = function () {
            var jsonResult = EmployeeCategoryService.FetchAll(function () {
                $scope.employeeCategorys = [];
                var data_employeeCategorys = jsonResult.data;
                var i = 0;
                $scope.employeeCategorys = data_employeeCategorys;


                //$rootScope.hideLoading();
            });
        };

        $scope.onCreateNew = function () {

            openModal({});
        };

        $scope.onRowEdit = function (employeeCategoryData) {

            openModal(angular.copy(employeeCategoryData));
        };

        $scope.onRowDelete = function (employeeCategoryData) {
            var sel = confirm("Are you sure you want to delete the Employee Category [" + employeeCategoryData.employee_category_description + "] ?");
            if (sel) {
                var jsonResult = EmployeeCategoryService.Delete(employeeCategoryData, function () {
                    $scope.Fetch();
                });
            }
        };


        $scope.OnSearch = function () {
            $scope.Fetch();
        };


        $scope.Fetch();
    });
