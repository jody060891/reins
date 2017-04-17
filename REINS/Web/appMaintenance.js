angular.module('HITS', [
    "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead", "ui.bootstrap.tooltip", "ui.bootstrap.popover",
    'ui.bootstrap.tpls',
    'ui.utils',
    'ngRoute',
    //'ngAnimate',
    'ngResource',
    'ivh.treeview',
    'wysiwyg.module',
    'angularFileUpload',
    'sticky',
    'duScroll',
    'timepickerPop',
    'ui.date']);

angular.module('HITS').config(function ($routeProvider) {

    $routeProvider.when('/location', { templateUrl: 'app/master/location/location-list.html' });
    $routeProvider.when('/designation', { templateUrl: 'app/master/designation/designation-list.html' });
    $routeProvider.when('/routingGroup', { templateUrl: 'app/master/routingGroup/routingGroup.html' });
    $routeProvider.when('/department', { templateUrl: 'app/master/department/department-list.html' });
    $routeProvider.when('/employeeCategory', { templateUrl: 'app/master/employeeCategory/employeeCategory-list.html' });
    $routeProvider.when('/institution', { templateUrl: 'app/master/institution/institution-list.html' });
    $routeProvider.when('/role', { templateUrl: 'app/master/role/role-list.html' });
    $routeProvider.when('/workflow', { templateUrl: 'app/master/workflow/workflow.html' });
    $routeProvider.when('/userACL', { templateUrl: 'app/master/acl/acl-list.html' });
    $routeProvider.when('/user', { templateUrl: 'app/master/user/user-list.html' });
    $routeProvider.when('/committeeGroup', { templateUrl: 'app/master/committeeGroup/committeeGroup.html' });
    $routeProvider.when('/incidentType', { templateUrl: 'app/master/incidentType/incidentType-list.html' });
    $routeProvider.when('/newIncident', { templateUrl: 'app/incident/newIncident/newIncident.html' });
    $routeProvider.when('/incidentList', { templateUrl: 'app/incident/incidentList/incidentList.html' });
    //$routeProvider.when('/interface/sapHrInterface', { templateUrl: 'app/interface/sap-hr-interface/sap-hr-interface.html' });
    $routeProvider.when('/discipline', { templateUrl: 'app/master/discipline/discipline-list.html' });
    $routeProvider.when('/patientClass', { templateUrl: 'app/master/patientClass/patientClass-list.html' });
    $routeProvider.when('/applicationSetting', { templateUrl: 'app/master/applicationSetting/applicationSetting-form.html' });
    $routeProvider.when('/security', { templateUrl: 'app/incident-details/security-detail/security-detail.html' });
    $routeProvider.when('/incident/track', { templateUrl: 'app/incident/track/incident-track-list.html' });
    $routeProvider.when('/incident/form', { templateUrl: 'app/incident/form/incident-form.html' });
    $routeProvider.when('/anesthesia', { templateUrl: 'app/incident-details/anesthesia/anesthesia-detail.html' });
    $routeProvider.when('/routingGroupUser', { templateUrl: 'app/master/routingGroup/routing-group-user/routing-group-user.html' });
    $routeProvider.when('/designationGroup', { templateUrl: 'app/master/designationGroup/designationGroup-list.html' });
    $routeProvider.when('/gcs', { templateUrl: 'app/master/gcs/gcs-list.html' });
    $routeProvider.when('/incident/form/reporterConfirmation', { templateUrl: 'app/incident/form/reporter-confirmation/incident-reporter-confirmation.html' });
    $routeProvider.when('/rootCauseCategory', { templateUrl: 'app/master/rootCauseCategory/rootCauseCategory.html' });
    $routeProvider.when('/rootCause', { templateUrl: 'app/master/rootCause/rootCause.html' });
    $routeProvider.when('/bloodProductTransfusion', { templateUrl: 'app/incident-details/blood-product-transfusion/blood-product-transfusion.html' });
    $routeProvider.when('/incident/followUp', { templateUrl: 'app/incident/track/incident-follow-up/incident-follow-up.html' });
    $routeProvider.when('/clinicalAssessmentTreatment', { templateUrl: 'app/incident-details/clinical-assessment-treatment/clinical-assessment-treatment.html' });
    $routeProvider.when('/behaviour', { templateUrl: 'app/incident-details/behaviour/behaviour.html' });
    $routeProvider.when('/incident/merge', { templateUrl: 'app/incident/merge/incident-merge-list.html' });
    $routeProvider.when('/incident/merge/form', { templateUrl: 'app/incident/merge/form/incident-merge-form.html' });
    $routeProvider.when('/incident/forward', { templateUrl: 'app/incident/forward/incident-forward/incident-forward-list.html' });
    $routeProvider.when('/incident/forward/guest', { templateUrl: 'app/incident/forward/incident-forward-guest/incident-forward-guest-list.html' });
    $routeProvider.when('/incident/forward/guest/view', { templateUrl: 'app/incident/forward/incident-forward-guest/incident-view/incident-forward-guest-view.html' });
    $routeProvider.when('/appSetting', { templateUrl: 'app/setting/application-setting/application-setting.html' });
    $routeProvider.when('/deviceEquipment', { templateUrl: 'app/incident-details/device-equipment/device-equipment.html' });
    $routeProvider.when('/environmentSafety', { templateUrl: 'app/incident-details/environment-safety/environment-safety.html' });
    $routeProvider.when('/falls', { templateUrl: 'app/incident-details/falls/falls.html' });
    $routeProvider.when('/laboratoryPathology', { templateUrl: 'app/incident-details/laboratory-pathology/laboratory-pathology.html' });
    $routeProvider.when('/documentation', { templateUrl: 'app/incident-details/documentation/documentation.html' });
    $routeProvider.when('/medicationEvents', { templateUrl: 'app/incident-details/medication-events/medication-events.html' });
    $routeProvider.when('/peripheralVenousComplications', { templateUrl: 'app/incident-details/peripheral-venous-complications/peripheral-venous-complications.html' });
    $routeProvider.when('/pressureInjury', { templateUrl: 'app/incident-details/pressure-injury/pressure-injury.html' });
    $routeProvider.when('/others', { templateUrl: 'app/incident-details/others/others.html' });
    $routeProvider.when('/emailTemplate', { templateUrl: 'app/master/emailTemplate/emailTemplate.html' });
    $routeProvider.when('/patientLocation', { templateUrl: 'app/master/patient-location/patient-location-list.html' });
    $routeProvider.when('/auditTrail', { templateUrl: 'app/master/auditTrail/audit-trail-list.html' });
    $routeProvider.when('/editUser', { templateUrl: 'app/master/user/edit-user-form/edit-user-form.html' });
    $routeProvider.when('/hospitalOccurrenceReport', { templateUrl: 'app/report/all-incident-report/hospital-occurrence-report/hospital-occurrence-report.html' });
    $routeProvider.when('/report/sacScoreReport',{templateUrl: 'app/report/all-incident-report/sac-score-report/sac-score-report.html'});
    $routeProvider.when('/report/falls/location',{templateUrl: 'app/report/falls/fall-location-report.html'});
    $routeProvider.when('/report/ens/ensSharpIncidence', { templateUrl: 'app/report/environment-and-safety/ens-sharp-incidence-report/ens-sharp-incidence-report.html' });
    $routeProvider.when('/report/typeOfIncident', { templateUrl: 'app/report/all-incident-report/type-of-incident-report/type-of-incident-report.html' });
    $routeProvider.when('/report/rootCauseClassificationReport', { templateUrl: 'app/report/all-incident-report/root-cause-classification-report/root-cause-classification-report.html' });
    $routeProvider.when('/report/SRENumberReport', { templateUrl: 'app/report/all-incident-report/sre-number-report/sre-number-report.html' });
    $routeProvider.when('/report/ens/ensSharpInjuryByDepartment',{templateUrl: 'app/report/environment-and-safety/ens-sharp-injury-by-department-report/ens-sharp-injury-by-department-report.html'});
    $routeProvider.when('/report/me/meSafetyCommitteebyLocation',{templateUrl: 'app/report/medication-events/me-safety-committee-by-location-report/me-safety-committee-by-location-report.html'});
    $routeProvider.when('/report/me/meSafetyCommitteeByStaff',{templateUrl: 'app/report/medication-events/me-safety-committee-by-staff-report/me-safety-committee-by-staff-report.html'});
    $routeProvider.when('/report/hamReport', { templateUrl: 'app/report/all-incident-report/ham-report/ham-report.html' });
    $routeProvider.when('/report/me/meTypeOfMedicationError',{templateUrl: 'app/report/medication-events/me-type-of-medication-error-report/me-type-of-medication-error-report.html'});
    $routeProvider.when('/report/ens/ensWorkplaceAggression',{templateUrl: 'app/report/environment-and-safety/ens-workplace-aggression-report/ens-workplace-aggression-report.html'});
    $routeProvider.when('/report/falls/exactLocation',{templateUrl: 'app/report/falls/exact-location/fall-exact-location.html'});
    $routeProvider.when('/report/falls/levelInjury',{templateUrl: 'app/report/falls/level-injury/fall-level-injury.html'});
    $routeProvider.when('/report/ens/ensWorkplaceAggressionN7',{templateUrl: 'app/report/environment-and-safety/ens-workplace-aggression-n7-report/ens-workplace-aggression-n7-report.html'});
    $routeProvider.when('/report/ens/ensSharpInjuryMotDsot',{templateUrl: 'app/report/environment-and-safety/ens-sharp-injury-mot-dsot-report/ens-sharp-injury-msot-dsot-report.html'});
    $routeProvider.when('/report/ens/ensPoliceReportLodged',{templateUrl: 'app/report/environment-and-safety/ens-police-report-lodged-report/ens-police-report-lodged-report.html'});
    $routeProvider.when('/report/ens/ensSharpInjuryHwc',{templateUrl: 'app/report/environment-and-safety/ens-sharp-injury-hwc/ens-sharp-injury-hwc.html'});
    $routeProvider.when('/report/falls/time',{templateUrl: 'app/report/falls/fall-by-time/fall-by-time.html'});
    $routeProvider.when('/report/falls/shift',{templateUrl: 'app/report/falls/shift/fall-by-shift.html'});
    $routeProvider.when('/report/falls/ageGroup',{templateUrl: 'app/report/falls/fall-age-group/fall-age-group.html'});
    $routeProvider.when('/report/falls/discipline',{templateUrl: 'app/report/falls/fall-by-discipline/fall-by-discipline.html'});
    $routeProvider.when('/report/falls/departmentWorkload',{templateUrl: 'app/report/falls/department-workload/fall-department-workload.html'});
    $routeProvider.when('/report/falls/gender',{templateUrl: 'app/report/falls/gender/fall-by-gender.html'});
    $routeProvider.when('/report/falls/activity',{templateUrl: 'app/report/falls/activity/fall-by-activity.html'});
    $routeProvider.when('/report/falls/adHoc', { templateUrl: 'app/report/falls/ad-hoc/fall-ad-hoc.html' });
    $routeProvider.when('/report/me/levelOfInjury', { templateUrl: 'app/report/medication-events/me-level-of-injury-report/me-level-of-injury-report.html' });
    $routeProvider.when('/patientDays',{templateUrl: 'app/master/patientDays/patient-days.html'});
    $routeProvider.when('/report/me/meNoOfAlliedHealth',{templateUrl: 'app/report/medication-events/me-no-of-allied-health/me-no-of-allied-health.html'});
    $routeProvider.when('/report/me/meNoOfMedicationByDesignationDiscipline',{templateUrl: 'app/report/medication-events/me-no-of-medication-by-designation-discipline/me-no-of-medication-by-designation-discipline.html'});
    $routeProvider.when('/report/me/meNoOfMedicationByStaffDesignation',{templateUrl: 'app/report/medication-events/me-no-of-medication-by-staff-designation/me-no-of-medication-by-staff-designation.html'});
    $routeProvider.when('/report/me/meNoOfMedicationByDesignationAndSequentialStage',{templateUrl: 'app/report/medication-events/me-no-of-medication-by-designation-and-sequential-stage/me-no-of-medication-by-designation-and-sequential-stage.html'});
    $routeProvider.when('/report/falls/inpatientInjury',{templateUrl: 'app/report/falls/inpatientInjury/fall-inpatient-injury.html'});
    $routeProvider.when('/report/psi/pressureInjuryReport',{templateUrl: 'app/report/pressure-injury/psi-presure-injury-report/psi-pressure-injury-report.html'});
    $routeProvider.when('/report/me/meSequentialStage',{templateUrl: 'app/report/medication-events/me-sequential-stage/me-sequential-stage.html'});
    $routeProvider.when('/report/me/meTypeOfMedication',{templateUrl: 'app/report/medication-events/me-type-of-medication/me-type-of-medication.html'});
    $routeProvider.when('/aeAttendance', { templateUrl: 'app/master/aeAttendance/ae-attendance.html' });
    $routeProvider.when('/shift', { templateUrl: 'app/master/shift/shift.html' });
    $routeProvider.when('/report/me/meLevelOfInjury', { templateUrl: 'app/report/medication-events/me-level-of-injury-report/me-level-of-injury-report.html' });

    $routeProvider.when('/report/RCAHistory',{templateUrl: 'app/report/all-incident-report/rca-history/rca-history-report.html'});
    $routeProvider.when('/rawData',{templateUrl: 'app/rawData/raw-data.html'});
    $routeProvider.when('/report/uam/userListingReport',{templateUrl: 'app/report/uam/uam-user-listing-report/uam-user-listing-report.html'});
    $routeProvider.when('/report/uam/accessMatrixReport',{templateUrl: 'app/report/uam/uam-access-matrix-report/uam-access-matrix-report.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({ redirectTo: '/' });

});

angular.module('HITS')
    .run(function ($rootScope, $location, AuthenticationService, SessionService, IncidentService, $interval, ApplicationSettingService) {
        $rootScope.safeApply = function (fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.loginUrl = '/Web/login.html';


    });
