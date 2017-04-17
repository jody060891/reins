angular.module('HITS')
    .controller('PrintIncidentCtrl', function($scope, $modal, $location, $q, $window, $document, $routeParams, UserAclSessionData, IncidentService, IncidentLockService, IncidentFormService, SessionService, AuthenticationService,
                                              IncidentSubTypeService, DesignationService, DepartmentService, EmployeeCategoryService, IncidentTypeService, LocationService, DisciplineService, PatientLocationService, PatientClassService, GcsService, WorkflowService, CommitteeGroupService, FileUploader, FileService, ApplicationSettingService, IncidentCommentService){
        //SessionService.setAclSession(UserAclSessionData);
        //SessionService.setAcltoScope($scope);
        $scope.printed = true;
        $scope.genInfo = {};
        $scope.today = new Date();
        $scope.action = false;
        $scope.submitNextLevelValidation = {};
        $scope.hasSearch = false;
        $scope.isDateEnable = true;
        $scope.first_time = true;
        $scope.add = false;
        $scope.incident_description_invalid = false;
        $scope.totalFileSize = 0;
        $scope.situation_invalid = false;
        $scope.background_invalid = false;
        $scope.assessment_invalid = false;
        $scope.recommendations_invalid = false;
        $scope.incident_description_invalid = false;
        $scope.fileSizeLimit = 2;
        $scope.totalFileSizeLimit = 8;
        $scope.isCommonArea = false;
        $scope.isManualRoutingEnabled = false;
        $scope.isShowButtonManualRouting = false;
        $scope.main_template_supervisor_value = {};
        $scope.testFile = {};
        $scope.form = {};
        $scope.form.is_edited = false;
        $scope.form.is_forwarded_to_you = false;
        $scope.form.is_read_only = true;
        var uploadErrorMessage = "";

        $scope.patient = "Patient";
        $scope.staff = "Staff";
        $scope.visitor = "Visitor";
        $scope.others = "Others";

        $scope.personCategorys = [
            $scope.patient,
            $scope.staff,
            $scope.visitor,
            $scope.others
        ];

        $scope.main_template = {};
        $scope.templateSections = [];
        $scope.incident_detail = {};
        $scope.dynamicFormScope = $scope;
        $scope.firstTimeDetails = false;

        $scope.datePickerOpen = function (id) {
            $timeout(function () {
                $("#" + id).focus();
            });
        };

        var desResult = DesignationService.FetchAll(function () {
            $scope.designations = desResult.data;
        });

        var deptResult = DepartmentService.FetchAll(function () {
            $scope.departments = deptResult.data;
        });

        var empResult = EmployeeCategoryService.FetchAll(function () {
            $scope.employeeCategorys = empResult.data;
        });

        var typeResult = IncidentTypeService.FetchAllSimpleModel(function () {
            $scope.incidentTypes = typeResult.data;
            $scope.incidentTypes1 = [];
            $scope.incidentTypes2 = [];
            angular.forEach($scope.incidentTypes, function (incident, key) {
                if (key < ($scope.incidentTypes.length / 2)) {
                    $scope.incidentTypes1.push(incident)
                } else {
                    $scope.incidentTypes2.push(incident);
                }
            });
        });


        var subTypeResult = IncidentSubTypeService.FetchAll(function () {
            $scope.incidentSubTypes = subTypeResult.data;
        });

        var locResult = LocationService.FetchAll(function () {
            $scope.locations = locResult.data;
        });

        var discResult = DisciplineService.FetchAll(function () {
            $scope.disciplines = discResult.data;
        });

        var patientLocResult = PatientLocationService.FetchAll(function () {
            $scope.patientLocations = patientLocResult.data;
        });

        var patientClassResult = PatientClassService.FetchAll(function () {
            $scope.patientClasses = patientClassResult.data;
        });

        var toggleAction = function () {
            $scope.action = !$scope.action;
        };

        var incidentTypeSearchResult = IncidentTypeService.FetchAllForSearchIncident(function () {
            $scope.incidentTypeFlats = incidentTypeSearchResult.data;
        });

        var jsonResult = GcsService.FetchAll(function () {
            $scope.gcs = jsonResult.data;

            angular.forEach($scope.gcs, function (gcs, k) {
                if (gcs.gcs_short_code == "E") {
                    $scope.eyes = gcs.MasterGcsDetails;
                } else if (gcs.gcs_short_code == "V") {
                    $scope.verbals = gcs.MasterGcsDetails;
                } else if (gcs.gcs_short_code == "M") {
                    $scope.motors = gcs.MasterGcsDetails;
                }
            });
        });

        $scope.someSelected = function (object) {
            if (!object) return false;

            return Object.keys(object).some(function (key) {
                return object[key];
            });
        };

        $scope.isInPatient = function () {
            var result = false;

            angular.forEach($scope.incident.PersonInvolveds, function (person, k) {
                if (person.patient_type == 'I' && person.is_active) result = true;
            });

            return result;
        };

        $scope.isOutPatient = function () {
            var result = false;

            angular.forEach($scope.incident.PersonInvolveds, function (person, k) {
                if (person.patient_type == 'O' && person.is_active) result = true;
            });

            return result;
        };

        $scope.isAnyNearMiss = function() {
            var result = false;
            angular.forEach($scope.incident.PersonInvolveds, function (person, k) {
                if (person.is_affected && person.is_active) {
                    result =  true;
                }
            });

            return result;
        };

        $scope.isExceptStaff = function () {
            var result = false;

            angular.forEach($scope.incident.PersonInvolveds, function (person, k) {
                if ((person.person_category == 'Patient' || person.person_category == 'Visitor' || person.person_category == 'Others') && person.is_active) result = true;
            });

            return result;
        };

        $scope.fetchIncidentTemplate = function () {

            var jsonResult = IncidentTypeService.FetchIncidentTemplate({
                incidentTypeId: $scope.incident.incident_type_id,
                incidentSubTypeId: $scope.incident.incident_sub_type_id
            }, function () {
                $scope.main_template_navigation = jsonResult.data.main_template_navigation;
                $scope.templateSections = jsonResult.data.DetailTemplates;
                $scope.main_template = jsonResult.data.main_template;

            }, function (){

            });
        };

        $scope.incidentDetailEnterValidation = function () {
            $scope.incident_detail.validation = false;
            if ($scope.incident.incident_type_id == null) {
                alert("Please choose Incident Type and Incident Sub Type (if any) first!");
                return false;
            }
            else {
                $scope.main_template_value = angular.fromJson($scope.incident.main_template_value);
                if ($scope.main_template_value == null){
                    $scope.main_template_value = {};
                }
                $scope.main_template = "";
                $scope.main_template_navigation = "";
                $scope.templateSections = [];
                $scope.fetchIncidentTemplate();
                return true;
            }
        };

        $scope.incidentDetailBeforeExit = function (){
            $scope.incident.main_template_value = JSON.stringify($scope.main_template_value);
        };

        $scope.incidentDetailExitValidation = function () {
            $scope.incidentDetailBeforeExit();
            if (!$scope.form.is_edited)
                return true;
            if (!this.details.$valid) {
                $scope.incident_detail.validation = true;
                $scope.firstTimeDetails = true;
                return false;
            }
            $document.unbind('click');
            return true;
        };

        $scope.onCheckRequiredDateElements = function (parentModel, childModel) {
            var is_check = false;
            if (parentModel) {
                if (parentModel == 'yes') {
                    if (childModel) {
                        if (childModel == '') {
                            is_check = true;
                        }
                    } else {
                        is_check = true;
                    }
                }
            } else {
                is_check = true;
            }
            return is_check;
        };

        $scope.onCheckRequiredRadioElements = function (parentModel) {
            var is_check = false;
            if (parentModel) {
            } else {
                is_check = true
            }
            return is_check;
        };


        $scope.$on('$destroy', function () {
            if ($scope.dynamicFormScope) {
                $scope.dynamicFormScope = null;
            }
            $scope.$$watchers = null;
            $scope.$$listeners = null;
            $document.unbind('scroll');
            $(window).unbind('scroll');
            $(window).unbind('resize');
        });

        $scope.fetchFileSizeLimit = function(){
            var d = $q.defer();

            var jsonSettingAutoPurge = ApplicationSettingService.FetchOneByKey({ keyValue: 'FILE_SIZE_LIMIT' }, function () {
                var filesizelimit = 2;
                if (jsonSettingAutoPurge.data){
                    filesizelimit = jsonSettingAutoPurge.data.setting_value_default;
                }
                d.resolve(filesizelimit);
            });

            return d.promise;
        };

        $scope.fetchTotalFileSizeLimit = function(){
            var d = $q.defer();

            var jsonSettingAutoPurge = ApplicationSettingService.FetchOneByKey({ keyValue: 'FILE_SIZE_TOTAL_LIMIT' }, function () {
                var filesizelimit = 8;
                if (jsonSettingAutoPurge.data){
                    filesizelimit = jsonSettingAutoPurge.data.setting_value_default;
                }
                d.resolve(filesizelimit);
            });

            return d.promise;
        };

        $scope.calculateTotalSize = function(){
            $scope.totalFileSize = 0;
            angular.forEach($scope.incident.Attachments, function(att, key){
                if (att.is_active) {
                    $scope.totalFileSize += att.filesize;
                }
            });
            $scope.totalFileSize = $scope.totalFileSize / 1024.00 / 1024.00;
        };

        $scope.fetchRoutingGroup = function () {
            var currentTrackingOrderLevel = 1;
            if ($scope.incident.current_tracking_order_level) {
                currentTrackingOrderLevel = $scope.incident.current_tracking_order_level;
            }
            var currentWorkflowId = 0;
            if ($scope.incident.workflow_id){
                currentWorkflowId = $scope.incident.workflow_id;
            }
            var jsonResult = WorkflowService.FetchNextRoutingGroup({
                employeeCategoryId: $scope.incident.employee_category_id,
                currentTrackingOrderLevel: currentTrackingOrderLevel,
                designationId: $scope.incident.designation_id,
                currentWorkflowId: currentWorkflowId,
                locationId: $scope.incident.routing_location_id,
                departmentId: $scope.incident.department_id,
                isAnonymous: $scope.incident.is_anonymous,
                reporterId: $scope.incident.created_by
            }, function () {
                $scope.routingGroups = jsonResult.data;
                $scope.routingUsers = [];
                $scope.routingGroup = {};
                var flag = true;
                angular.forEach($scope.routingGroups, function (rGroup, key) {
                    if (flag) {
                        $scope.routingGroup = rGroup;
                        $scope.routingUsers = rGroup.RoutingUsers;
                        flag = false;
                    }
                });
            });
        };

        $scope.fetchCommitteeGroup = function () {
            var listDiscipline = [];
            var listPersonInvolved = [];
            $scope.committeeGroups = [];
            angular.forEach($scope.incident.PersonInvolveds, function(person, key){
                if (person.patient_class != null){
                    listDiscipline.push(person.patient_class);
                }
                if (person.person_category.toLowerCase() == 'patient'){
                    listPersonInvolved.push(person.patient_type);
                }
                else {
                    listPersonInvolved.push(person.person_category);
                }
            });

            var jsonResult = CommitteeGroupService.FetchAllForIncidentCc({
                incidentTypeId: $scope.incident.incident_type_id,
                incidentSubTypeId: $scope.incident.incident_sub_type_id,
                locationId: $scope.incident.location_id,
                departmentId: $scope.incident.department_id,
                listDisciplineCode: listDiscipline,
                listPersonInvolved: listPersonInvolved
            }, function () {
                $scope.committeeGroups = jsonResult.data;
                $scope.incident.Ccs = [];
                angular.forEach($scope.committeeGroups, function (rCommittee, key) {
                    $scope.incident.Ccs.push(rCommittee);
                });
            });
        };

        $scope.incidentDescriptionEnterValidation = function () {
            if ($scope.incident.incident_type_id == null) {
                alert("Please choose Incident Type and Location of Incident first!");
                return false;
            }
            else {
                $scope.fetchRoutingGroup();
                $scope.fetchCommitteeGroup();
                $scope.main_template = "";
                var jsonResult = IncidentTypeService.FetchOne({
                    incidentTypeId: $scope.incident.incident_type_id
                }, function () {
                    var data = jsonResult.data;
                    $scope.main_template_supervisor = "";
                    $scope.main_template_supervisor = data.main_template_supervisor;
                    $scope.incident.main_template_supervisor = $scope.main_template_supervisor;
                    $scope.main_template_supervisor_value = angular.fromJson($scope.incident.main_template_supervisor_value);
                });

                $q.all([
                    $scope.fetchFileSizeLimit(),
                    $scope.fetchTotalFileSizeLimit()
                ]).then(function (data) {
                    var fileSizeLimit = data[0];
                    var totalFileSizeLimit = data[1];
                    $scope.fileSizeLimit = fileSizeLimit;
                    $scope.totalFileSizeLimit = totalFileSizeLimit;

                    $scope.calculateTotalSize();

                });

                return true;
            }
        };

        $scope.fetchComments = function () {
            var incidentId = $scope.incident.incident_id;
            if (incidentId == null) {
                incidentId = 0;
            }
            if ($scope.currentAcl['INCIDENT_TRACK_INCIDENT_COMMENT_VIEW_ALL']) {
                var jsonResult = IncidentCommentService.FetchAll({
                    incidentId: incidentId
                }, function () {
                    $scope.incident.Comments = [];
                    $scope.incident.Comments = jsonResult.data;

                    angular.forEach($scope.incident.Comments, function (comment, k) {
                        comment.factors_minimizing_incident = JSON.parse(comment.factors_minimizing_incident);
                        comment.how_to_prevent = JSON.parse(comment.how_to_prevent);
                    });
                });
            } else {
                var jsonResult = IncidentCommentService.FetchAllWithReporterView({
                    incidentId: incidentId
                }, function () {
                    $scope.incident.Comments = [];
                    $scope.incident.Comments = jsonResult.data;

                    angular.forEach($scope.incident.Comments, function (comment, k) {
                        comment.factors_minimizing_incident = JSON.parse(comment.factors_minimizing_incident);
                        comment.how_to_prevent = JSON.parse(comment.how_to_prevent);
                    });
                });
            }
        };

        $scope.calculateSAC = function () {
            $scope.sacScore = "";
            $scope.sacScore = String($scope.incident.sac_likelihood) + String($scope.incident.sac_consequences);
        };

        $scope.fetchMergedIncidents = function () {
            var d = $q.defer();
            if ($scope.incident.incident_id > 0) {
                if ($scope.incident.current_tracking_status == "MERGED") {
                    var jsonResultMainIncident = IncidentService.FetchMainIncidents({ incidentId: $scope.incident.incident_id }, function () {
                        var incidentMainData = jsonResultMainIncident.data;
                        d.resolve(incidentMainData);
                    });
                } else {
                    var jsonResultMergedIncident = IncidentService.FetchMergedIncidents({ incidentId: $scope.incident.incident_id }, function () {
                        var incidentMerged = jsonResultMergedIncident.data;
                        d.resolve(incidentMerged);
                    });
                }

            } else {
                var jsonResultMergedIncident = IncidentService.FetchMergedIncidents({ incidentId: 0 }, function () {
                    var incidentMerged = jsonResultMergedIncident.data;
                    d.resolve(incidentMerged);
                });
            }

            return d.promise;
        };

        var paramIncidentId = $location.search().incident_id;
        var paramUserId = $location.search().user_id;

        if (paramUserId){
            var jsonResultAuthentication = AuthenticationService.SetAuthorizationUser({userId: paramUserId}, function(){
                var topFiveResult = IncidentService.FetchTopFIve(function () {
                    $scope.topFives = topFiveResult.data;
                });

                var jsonResultCurrentUser = AuthenticationService.GetCurrentUser(function(){
                    $scope.userSession = jsonResultCurrentUser.data;

                    var jsonResultAcl = AuthenticationService.GetCurrentUserAcl(function(){
                        SessionService.setAclSession(jsonResultAcl.data);
                        SessionService.setAcltoScope($scope);

                        if (paramIncidentId) {
                            $scope.incident = {incident_id: paramIncidentId};

                            var jsonResultIncident = IncidentService.FetchOne({ incidentId: $scope.incident.incident_id }, function () {
                                $scope.incident = jsonResultIncident.data;
                                $scope.main_template_supervisor_value = $scope.incident.main_template_supervisor_value;
                                $scope.isAnonymous = $scope.incident.is_anonymous;

                                $q.all([
                                    $scope.fetchMergedIncidents()
                                ]).then(function(data) {
                                    var mergedIncidentData = data[0];


                                    if ($scope.incident.incident_id > 0) {
                                        if ($scope.incident.current_tracking_status == "MERGED") {
                                            $scope.form.is_edited = false;
                                            $scope.incident.incident_main = mergedIncidentData;
                                        }
                                        else {
                                            $scope.incident.incident_merged = mergedIncidentData;
                                        }
                                    }
                                    else {
                                        $scope.incident.incident_merged = mergedIncidentData;
                                    }

                                    $scope.wizard = {
                                        totalSteps: 7,
                                        stepIndicatorClass: "steps-7",
                                        currentStep: 1,
                                        steps: [
                                            {
                                                order: 1,
                                                completed: false,
                                                selected: true,
                                                showed: true,
                                                validated: false,
                                                acl: "",
                                                title: "General Information",
                                                url: "/incident/form/generalInformation"
                                            },
                                            {
                                                order: 2,
                                                completed: false,
                                                selected: false,
                                                showed: true,
                                                validated: false,
                                                title: "Person Involved",
                                                acl: "",
                                                url: "/incident/form/personInvolved"
                                            },
                                            {
                                                order: 3,
                                                completed: false,
                                                selected: false,
                                                showed: true,
                                                validated: false,
                                                acl: "",
                                                title: "Incident Details",
                                                url: "/incident/form/incidentDetails"
                                            },
                                            {
                                                order: 4,
                                                completed: false,
                                                selected: false,
                                                showed: true,
                                                validated: false,
                                                acl: "",
                                                title: "Description",
                                                url: "/incident/form/description"
                                            },
                                            {
                                                order: 5,
                                                completed: false,
                                                selected: false,
                                                showed: false,
                                                validated: true,
                                                acl: "",
                                                title: "Response",
                                                url: "/incident/form/response"
                                            },
                                            {
                                                order: 6,
                                                completed: false,
                                                selected: false,
                                                showed: false,
                                                validated: false,
                                                acl: "INCIDENT_TRACK_INCIDENT_SAC_VIEW",
                                                title: "SAC",
                                                url: "/incident/form/sac"
                                            },
                                            {
                                                order: 7,
                                                completed: false,
                                                selected: false,
                                                showed: false,
                                                validated: false,
                                                acl: "INCIDENT_TRACK_INCIDENT_RCA_VIEW",
                                                title: "Root Cause Analysis",
                                                url: "/incident/form/rca"
                                            }
                                        ]
                                    };
                                    if ($scope.currentAcl['INCIDENT_TRACK_INCIDENT_COMMENT_VIEW'] && $scope.incident.current_tracking_status != 'DRAFT' && ($scope.incident.Comments.length > 0 || ($scope.currentAcl['INCIDENT_TRACK_INCIDENT_COMMENT_ADD'] && $scope.incident.created_by != $scope.userSession.user_id)) || $scope.form.is_forwarded_to_you) {
                                        $scope.wizard.steps[4].showed = true;
                                    }
                                    if ((($scope.currentAcl['INCIDENT_TRACK_INCIDENT_SAC_VIEW'] && $scope.incident.created_by != $scope.userSession.user_id) ||  $scope.form.is_forwarded_to_you) && $scope.incident.current_tracking_status != 'DRAFT'){
                                        $scope.wizard.steps[5].showed = true;
                                    }
                                    if ((($scope.currentAcl['INCIDENT_TRACK_INCIDENT_RCA_VIEW'] && $scope.incident.created_by != $scope.userSession.user_id) ||  $scope.form.is_forwarded_to_you) && $scope.incident.current_tracking_status != 'DRAFT'){
                                        $scope.wizard.steps[6].showed = true;
                                    }
                                    $scope.btnState = {};
                                    $scope.btnState['btnSaveDraft'] = false;
                                    $scope.btnState['btnForward'] = false;
                                    $scope.btnState['btnReRoute'] = false;
                                    $scope.btnState['btnSubmit'] = false;
                                    $scope.btnState['btnSubmitToNextLevel'] = false;
                                    $scope.btnState['btnViewHistory'] = false;
                                    $scope.btnState['btnClose'] = false;
                                    $scope.btnState['btnReOpen'] = false;
                                    $scope.btnState['btnBackToMerge'] = false;
                                    $scope.btnState['btnAddComment'] = false;
                                    $scope.btnState['btnAddCorrectiveAction'] = false;
                                    $scope.btnState['btnAddFollowUp'] = false;
                                    $scope.btnState['btnDelete'] = false;
                                    $scope.btnState['btnRestore'] = false;


                                    $scope.isAnonymous = $scope.incident.is_anonymous;
                                    $scope.incidentDetailEnterValidation();
                                    $scope.incidentDescriptionEnterValidation();
                                    $scope.fetchComments();
                                    $scope.calculateSAC();

                                });
                            });
                        }


                    });

                });
            });
        }

        $scope.onPrint = function(){
            var radioCtrls = $("input[type=radio]");
            radioCtrls.each(function(i, e) {
                if($(this).is(':checked')) {
                    $(this)[0].setAttribute("checked", "checked");
                }
            });
            var checkboxCtrls = $("input[type=checkbox]");
            checkboxCtrls.each(function(i, e) {
                if($(this).is(':checked')) {
                    $(this)[0].setAttribute("checked", "checked");
                }
            });
            $window.print();
        };

    });