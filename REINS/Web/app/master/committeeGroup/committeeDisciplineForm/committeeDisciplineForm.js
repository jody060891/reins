angular.module('HITS').controller('CommitteedisciplineformCtrl', function ($scope, DisciplineService, committeeGroup, CommitteeGroupService, $modalInstance) {

    if (!committeeGroup.Disciplines) committeeGroup.Disciplines = [];

    $scope.committeeGroup = committeeGroup;
    $scope.select = {};
    $scope.select.selectAllDiscipline = false;
    $scope.select.unselectAllDiscipline = false;
    var hash = {};
    angular.forEach($scope.committeeGroup.Disciplines, function (discipline, k) {
        hash[discipline.discipline_id] = discipline;
    });

    var jsonResult = DisciplineService.FetchAll(function () {
        $scope.disciplines = jsonResult.data;

        angular.forEach($scope.disciplines, function (discipline, k) {
            if (!hash[discipline.discipline_id]) {
                committeeGroup.Disciplines.push({
                    committee_group_id: committeeGroup.committee_group_id,
                    discipline_id: discipline.discipline_id,
                    is_active: false,
                    Discipline: discipline
                });
            }
        });
    });

    $scope.select_all_discipline = function () {
        if (!$scope.select.selectAllDiscipline) {
            $scope.select.selectAllDiscipline = true;
            $scope.select.unselectAllDiscipline = false;
        } else {
            $scope.select.selectAllDiscipline = false;
            $scope.select.unselectAllDiscipline = false;
        }
        angular.forEach($scope.committeeGroup.Disciplines, function (discipline) {
            discipline.is_active = $scope.select.selectAllDiscipline;

        });
    }

    $scope.unselect_all_discipline = function () {
        if (!$scope.select.unselectAllDiscipline) {
            $scope.select.selectAllDiscipline = false;
            $scope.select.unselectAllDiscipline = true;
        } else {
            $scope.select.selectAllDiscipline = false;
            $scope.select.unselectAllDiscipline = false;
        }
        if ($scope.select.unselectAllDiscipline) {
            angular.forEach($scope.committeeGroup.Disciplines, function (discipline) {
                discipline.is_active = false;

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

        var disciplines = angular.copy($scope.committeeGroup.Disciplines);
        $scope.committeeGroup.Disciplines = [];

        angular.forEach(disciplines, function (discipline, k) {
            if (discipline.committee_discipline_id || discipline.is_active) {
                $scope.committeeGroup.Disciplines.push(discipline);
            }
        });

        var result = CommitteeGroupService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };
});