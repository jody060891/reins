angular.module('HITS').controller('EmailtemplateformCtrl', function ($scope, emailTemplate, EmailTemplateService, $modalInstance) {

    $scope.emailTemplate = emailTemplate;

    var toggleAction = function () {
        $scope.action = !$scope.action;
    };

    $scope.onSave = function (data) {
        toggleAction();
        var result = EmailTemplateService.Save(data, function () {
            $modalInstance.close();

            toggleAction();
        });
    };

    $scope.customMenu = [
            ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
            ['font'],
            ['font-size'],
            ['font-color', 'hilite-color'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['left-justify', 'center-justify', 'right-justify'],
            ['code', 'quote', 'paragragh'],
            ['link']
    ];
});