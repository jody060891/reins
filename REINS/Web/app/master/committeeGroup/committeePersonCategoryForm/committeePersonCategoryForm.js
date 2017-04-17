angular.module('HITS').controller('CommitteepersoncategoryformCtrl', function ($scope, committeeGroup, CommitteeGroupService, $modalInstance) {

    if (!committeeGroup.PersonCategorys) committeeGroup.PersonCategorys = [];

    $scope.committeeGroup = committeeGroup;
    $scope.select = {};
    $scope.select.selectAllPersonCategory = false;
    $scope.select.unselectAllPersonCategory = false;
    var hash = {};
    angular.forEach($scope.committeeGroup.PersonCategorys, function (person_category, k) {
        hash[person_category.code] = person_category;
    });


    $scope.person_categorys = [{
        code: "I",
        label: "In-Patient"
    },
    {
        code: "O",
        label: "Out-Patient"
    },
    {
        code: "Staff",
        label: "Staff"
    },
    {
        code: "Visitor",
        label: "Visitor"
    },
    {
        code: "Others",
        label: "Others"
    }
    ];

    angular.forEach($scope.person_categorys, function (person_category, k) {
        if (!hash[person_category.code]) {
            committeeGroup.PersonCategorys.push({
                committee_group_id: committeeGroup.committee_group_id,
                label: person_category.label,
                code: person_category.code,
                is_active: false,
                PersonCategory: person_category
            });
        }
    });


    $scope.select_all_person_category = function () {
        if (!$scope.select.selectAllPersonCategory) {
            $scope.select.selectAllPersonCategory = true;
            $scope.select.unselectAllPersonCategory = false;
        } else {
            $scope.select.selectAllPersonCategory = false;
            $scope.select.unselectAllPersonCategory = false;
        }
        angular.forEach($scope.committeeGroup.PersonCategorys, function (person_category) {
            person_category.is_active = $scope.select.selectAllPersonCategory;

        });
    }

    $scope.unselect_all_person_category = function () {
        if (!$scope.select.unselectAllPersonCategory) {
            $scope.select.selectAllPersonCategory = false;
            $scope.select.unselectAllPersonCategory = true;
        } else {
            $scope.select.selectAllPersonCategory = false;
            $scope.select.unselectAllPersonCategory = false;
        }
        if ($scope.select.unselectAllPersonCategory) {
            angular.forEach($scope.committeeGroup.PersonCategorys, function (person_category) {
                person_category.is_active = false;

            });
        }
    }

    $scope.validate = {};
    $scope.validate.button = true;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSubmit = function (data) {
        $modalInstance.close(data);
    }

    $scope.onSave = function (data) {
        $scope.validate.button = false;
        toggleAction();

        var person_categorys = angular.copy($scope.committeeGroup.PersonCategorys);
        $scope.committeeGroup.PersonCategorys = [];

        angular.forEach(person_categorys, function (person_category, k) {
            if (person_category.committee_person_category_id || person_category.is_active) {
                $scope.committeeGroup.PersonCategorys.push(person_category);
            }
        });

        var result = CommitteeGroupService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});