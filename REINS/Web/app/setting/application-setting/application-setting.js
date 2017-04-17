angular.module('HITS')
    .controller('ApplicationSettingCtrl',function($scope, $location, ApplicationSettingService, SapHrInterfaceService, TempSapHrService, ToastMessageService, SessionService) {
        SessionService.setAcltoScope($scope);
        if (!$scope.currentAcl['SM_APPLICATION_SETTING_VIEW']){
            $location.path('/unauthorized');
        }
        $scope.days = [
            { day: "Monday", value: "Monday" },
            { day: "Tuesday", value: "Tuesday" },
            { day: "Wednesday", value: "Wednesday" },
            { day: "Thursday", value: "Thursday" },
            { day: "Friday", value: "Friday" },
            { day: "Saturday", value: "Saturday" },
            { day: "Sunday", value: "Sunday" }
        ];
        $scope.appSettingHITS = [];
        $scope.appSettingSFTP = [];
        $scope.appSettingSMTP = [];

        $scope.appSettingHITSWithLabel = [];

        $scope.invalid = {};
        $scope.invalid.ReminderAutoPurgeDraft = false;
        $scope.invalid.ReminderAutoPurgeDraftSeverity = false;
        $scope.invalid.ReminderSessionStart = false;
        $scope.invalid.TimeoutReminder = false;


        $scope.isValid = function (appSettingHITS) {
            var result = true;
            var DaysToComplete = 0;
            var DaysToCompleteSeverity = 0;
            var DaysAutoPurge = 0;
            var TimeoutReminder = 0;
            var ReminderSessionStart = 0;
            angular.forEach(appSettingHITS, function (setting, k) {
                if (setting.key_value == "DAYS_TO_COMPLETE_INCIDENT") {
                    DaysToComplete = parseInt(setting.setting_value_default);
                }
                if (setting.key_value == "DAYS_TO_REMINDER_AUTO_PURGE_DRAFT_INCIDENT") {
                    DaysAutoPurge = parseInt(setting.setting_value_default);
                }
                if (setting.key_value == "DAYS_TO_COMPLETE_SEVERITY_INCIDENT") {
                    DaysToCompleteSeverity = parseInt(setting.setting_value_default);
                }
                if (setting.key_value == "SESSION_TIMEOUT") {
                    TimeoutReminder = parseInt(setting.setting_value_default);
                }
                if (setting.key_value == "SESSION_TIMEOUT_REMINDER") {
                    ReminderSessionStart = parseInt(setting.setting_value_default);
                }
            });
            if (DaysToComplete >= DaysAutoPurge) {
                $scope.invalid.ReminderAutoPurgeDraft = false;
            } else {
                $scope.invalid.ReminderAutoPurgeDraft = false;
            }
            if (DaysToCompleteSeverity >= DaysAutoPurge) {
                $scope.invalid.ReminderAutoPurgeDraftSeverity = false;
            } else {
                $scope.invalid.ReminderAutoPurgeDraftSeverity = false;
            }

            if (ReminderSessionStart < 2) {
                $scope.invalid.ReminderSessionStart = true;
                result = false;
            } else {
                $scope.invalid.ReminderSessionStart = false;
            }
            if (TimeoutReminder < 2) {
                $scope.invalid.TimeoutReminder = true;
                result = false;
            } else {
                $scope.invalid.TimeoutReminder = false;
            }
            return result;
        }


        $scope.onSave = function () {
            if ($scope.isValid($scope.appSettingHITS)) {
                var data = [];
                angular.forEach($scope.appSettingHITS, function (setting, k) {
                    data.push(setting);
                });

                var result = ApplicationSettingService.BulkSave(data, function () {
                    var messageType = "", message = "";
                    if (result) {
                        messageType = "success";
                        message = "Data Saved Succesfully";
                    } else {
                        messageType = "danger";
                        message = "Save application setting failed";
                    }
                    ToastMessageService.addAlerts(messageType, message);
                });
            }
            
        };

        $scope.onSaveEmailTemplateSetting = function () {
            var data = [];
            angular.forEach($scope.emailTemplateSettings, function (setting, k) {
                data.push(setting);
            });

            var result = ApplicationSettingService.BulkSaveEmailTemplateSetting(data, function () {
                var messageType = "", message = "";
                if (result) {
                    messageType = "success";
                    message = "Data Saved Succesfully";
                } else {
                    messageType = "danger";
                    message = "Save application setting failed";
                }
                ToastMessageService.addAlerts(messageType, message);
            });
        };
        
        $scope.AppSettingGroups = [];
        $scope.FetchHITSSetting = function () {
            var jsonResult = ApplicationSettingService.FetchHitsSetting(function () {
                $scope.appSettingHITS = [];
                var dataAppSettings = jsonResult.data;
                $scope.appSettingHITS = dataAppSettings;
                $scope.AppSettinggroups = [];
                angular.forEach($scope.appSettingHITS, function (setting, k) {
                    if ($scope.AppSettingGroups.indexOf(setting.group_name) < 0) {
                        $scope.AppSettingGroups.push(setting.group_name);
                    }
                });
                
                //$scope.fetchLabelAndGroup($scope.appSettingHITS);
                $scope.isValid($scope.appSettingHITS);
            });
        };
        $scope.FetchHITSEmailTemplateSetting = function() {
            var jsonResult = ApplicationSettingService.FetchEmailTemplateSetting(function () {
                $scope.emailTemplateSettings = [];
                var dataAppSettings = jsonResult.data;
                $scope.emailTemplateSettings = dataAppSettings;
            });
                
        }

        $scope.onFetchHITSEmailTemplateSetting = function() {
            $scope.FetchHITSEmailTemplateSetting();
        }
        //$scope.FetchSFTPSetting = function () {
        //    var jsonResult = ApplicationSettingService.FetchSapHrSetting(function () {
        //        $scope.appSettingSFTP = [];
        //        var dataAppSettings = jsonResult.data;
        //        $scope.appSettingSFTP = dataAppSettings;
        //    });
        //};
        //
        //$scope.FetchSMTPSetting = function () {
        //    var jsonResult = ApplicationSettingService.FetchSmtpSetting(function () {
        //        $scope.appSettingSMTP = [];
        //        var dataAppSettings = jsonResult.data;
        //        $scope.appSettingSMTP = dataAppSettings;
        //    });
        //};

        $scope.ReplaceString = function (stringInput) {
            return stringInput.replace(/\d+\_/, " ");
        }

        $scope.FetchHITSSetting();
        //$scope.FetchSFTPSetting();
        //$scope.FetchSMTPSetting();
    });