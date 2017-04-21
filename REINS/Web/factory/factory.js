angular.module('PKBL')
    .factory('ModuleService', [
        '$resource', function($resource) {
            return $resource('/Module/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                RenderNavigation: {
                    method: 'POST',
                    params: {
                        verb: 'RenderNavigation'
                    }
                }
            });
        }
    ])
    .factory('AuthenticationService', [
        '$resource', function($resource) {
            return $resource('/Authentication/:verb', {}, {
                Login: {
                    method: 'POST',
                    params: {
                        verb: 'Login'
                    }
                },
                Logout: {
                    method: 'POST',
                    params: {
                        verb: 'Logout'
                    }
                },
                IsLoggedIn: {
                    method: 'POST',
                    params: {
                        verb: 'IsLoggedIn'
                    }
                },
                GetCurrentUser: {
                    method: 'POST',
                    params: {
                        verb: 'GetCurrentUser'
                    }
                },
                GetCurrentUserAcl: {
                    method: 'POST',
                    params: {
                        verb: 'GetCurrentUserAcl'
                    }
                },
                GetRoleAcl: {
                    method: 'POST',
                    params: {
                        verb: 'GetRoleAcl'
                    }
                },
                SetAuthorizationUser: {
                    method: 'POST',
                    params: {
                        verb: 'SetAuthorizationUser'
                    }
                }
            });
        }
    ])
    .factory('HospitalOccurrenceReportService', [
        '$resource', function($resource) {
            return $resource('/HospitalOccurrenceReport/:verb', {}, {
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                },
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                },
                GenerateData: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateData'
                    }
                }
            });
        }
    ])
    .factory('TypeOfIncidentReportService', [
        '$resource', function($resource) {
            return $resource('/TypeOfIncidentReport/:verb', {}, {
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                },
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                },
                GenerateData: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateData'
                    }
                }
            });
        }
    ])
    .factory('SRENumberReportService', [
        '$resource', function($resource) {
            return $resource('/SRENumberReport/:verb', {}, {
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                },
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                }
            });
        }
    ])
    .factory('RCAHistoryReportService', [
        '$resource', function($resource) {
            return $resource('/RCAHistoryReport/:verb', {}, {
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                },
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                }
            });
        }
    ])
    .factory('RawDataService', [
        '$resource', function($resource) {
            return $resource('/RawDataReport/:verb', {}, {
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                },
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                }
            });
        }
    ])
    .factory('RootCauseClassificationReportService', [
        '$resource', function($resource) {
            return $resource('/RootCauseClassificationReport/:verb', {}, {
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                },
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                },
                GenerateData: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateData'
                    }
                }
            });
        }
    ])
    .factory('LocationService', [
        '$resource', function($resource) {
            return $resource('/Location/:verb', {}, {
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllLocationByUserId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllLocationByUserId'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                CheckIsCommonArea: {
                    method: 'POST',
                    params: {
                        verb: 'CheckIsCommonArea'
                    }
                },
                FetchAllLocationByCommonArea: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllLocationByCommonArea'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                },
            });
        }
    ])
    .factory('InstitutionService', [
        '$resource', function($resource) {
            return $resource('/Institution/:verb', {}, {
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('RoutingGroupService', [
        '$resource', function($resource) {
            return $resource('/RoutingGroup/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                DeleteRoutingUser: {
                    method: 'POST',
                    params: {
                        verb: 'DeleteRoutingUser'
                    }
                },
                FetchAllLocationByUserId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllLocationByUserId'
                    }
                },
                FetchAllDepartmentByUserId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllDepartmentByUserId'
                    }
                },
                FetchAllSubmittedStatus: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllSubmittedStatus'
                    }
                },
                SaveUserRoutingLocation: {
                    method: 'POST',
                    params: {
                        verb: 'SaveUserRoutingLocation'
                    }
                },
                SaveUserRoutingDepartment: {
                    method: 'POST',
                    params: {
                        verb: 'SaveUserRoutingDepartment'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                }
                //FetchAllUserDynamicRoutingGroup: {
                //    method: 'POST',
                //    params: {
                //        verb: 'FetchAllUserDynamicRoutingGroup'
                //    }
                //},
                //SaveDynamicRoutingUsers: {
                //    method: 'POST',
                //    params: {
                //        verb: 'SaveDynamicRoutingUsers'
                //    }
                //}w
            });
        }
    ])
    .factory('CommitteeGroupService', [
        '$resource', function($resource) {
            return $resource('/CommitteeGroup/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByIncidentTypeId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByIncidentTypeId'
                    }
                },
                FetchAllForIncidentCc: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllForIncidentCc'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                }
            });
        }
    ])
    .factory('DesignationService', [
        '$resource', function($resource) {
            return $resource('/Designation/:verb', {}, {
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByEmployeeCategoryId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByEmployeeCategoryId'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                }
            });
        }
    ])

    .factory('EmployeeCategoryService', [
        '$resource', function($resource) {
            return $resource('/EmployeeCategory/:verb', {}, {
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                }
            });
        }
    ])
    .factory('RoleService', [
        '$resource', function($resource) {
            return $resource('/Role/:verb', {}, {
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                }
            });
        }
    ])
    .factory('WorkflowService', [
        '$resource', function($resource) {
            return $resource('/Workflow/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                SaveList: {
                    method: 'POST',
                    params: {
                        verb: 'SaveList'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchNextRoutingGroup: {
                    method: 'POST',
                    params: {
                        verb: 'FetchNextRoutingGroup'
                    }
                },
                FetchReRouteRoutingGroup: {
                    method: 'POST',
                    params: {
                        verb: 'FetchReRouteRoutingGroup'
                    }
                },
                FetchAllRoutingGroup: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllRoutingGroup'
                    }
                },
                FetchHighestWorkflow: {
                    method: 'POST',
                    params: {
                        verb: 'FetchHighestWorkflow'
                    }
                },
                FetchNextWorkflow: {
                    method: 'POST',
                    params: {
                        verb: 'FetchNextWorkflow'
                    }
                }
                //FetchRoutingUserByWorkflowLevel: {
                //    method: 'POST',
                //    params: {
                //        verb: 'FetchRoutingUserByWorkflowLevel'
                //    }
                //}
            });
        }
    ])
    .factory('RoleAclService', [
        '$resource', function($resource) {
            return $resource('/RoleAcl/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('AclService', [
        '$resource', function($resource) {
            return $resource('/Acl/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('UserService', [
        '$resource', function($resource) {
            return $resource('/User/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                FetchAllDeletedWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllDeletedWithPagination'
                    }
                },
                FetchAllIsActiveWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllIsActiveWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                SaveForm: {
                    method: 'POST',
                    params: {
                        verb: 'SaveForm'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                UnDelete: {
                    method: 'POST',
                    params: {
                        verb: 'UnDelete'
                    }
                },
                FetchAllForRoutingGroup: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllForRoutingGroup'
                    }
                },
            });
        }
    ])
    .factory('AuditTrailService', [
        '$resource', function($resource) {
            return $resource('/AuditTrail/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                }
            });
        }
    ])
    .factory('UserAuditTrailService', [
        '$resource', function($resource) {
            return $resource('/UserAuditTrail/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                FetchDetailFor: {
                    method: 'POST',
                    params: {
                        verb: 'FetchDetailFor'
                    }
                }
            });
        }
    ])
    .factory('UserAuditTrailReportService', [
        '$resource', function($resource) {
            return $resource('/UserAuditTrailReport/:verb', {}, {
                GenerateXls: {
                    method: 'POST',
                    params: {
                        verb: 'GenerateXls'
                    }
                },
                GeneratePdf: {
                    method: 'POST',
                    params: {
                        verb: 'GeneratePdf'
                    }
                }
            });
        }
    ])
    .factory('UserRoleService', [
        '$resource', function($resource) {
            return $resource('/UserRole/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                }
            });
        }
    ])
    .factory('IncidentTypeService', [
        '$resource', function($resource) {
            return $resource('/IncidentType/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllForSearchIncident: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllForSearchIncident'
                    }
                },
                FetchAllSimpleModel: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllSimpleModel'
                    }
                },
                FetchAllByUserId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByUserId'
                    }
                },
                FetchIncidentTemplate: {
                    method: 'POST',
                    params: {
                        verb: 'FetchIncidentTemplate'
                    }
                }
            });
        }
    ])
    .factory('IncidentStatusMovementService', [
        '$resource', function($resource) {
            return $resource('/IncidentStatusMovement/:verb', {}, {
                FetchStatus: {
                    method: 'POST',
                    params: {
                        verb: 'FetchStatus'
                    }
                },
                FetchLastStatus: {
                    method: 'POST',
                    params: {
                        verb: 'FetchLastStatus'
                    }
                }
            });
        }
    ])
    .factory('ApplicationSettingService', [
        '$resource', function($resource) {
            return $resource('/ApplicationSetting/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                BulkSave: {
                    method: 'POST',
                    params: {
                        verb: 'BulkSave'
                    }
                },
                BulkSaveEmailTemplateSetting: {
                    method: 'POST',
                    params: {
                        verb: 'BulkSaveEmailTemplateSetting'
                    }
                },
                FetchSapHrSetting: {
                    method: 'POST',
                    params: {
                        verb: 'FetchSapHrSetting'
                    }
                },
                FetchSmtpSetting: {
                    method: 'POST',
                    params: {
                        verb: 'FetchSmtpSetting'
                    }
                },
                FetchHitsSetting: {
                    method: 'POST',
                    params: {
                        verb: 'FetchHitsSetting'
                    }
                },
                FetchEmailTemplateSetting: {
                    method: 'POST',
                    params: {
                        verb: 'FetchEmailTemplateSetting'
                    }
                },
                FetchOneByKey: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOneByKey'
                    }
                }
            });
        }
    ])
    .factory('SapHrInterfaceService', [
        '$resource', function($resource) {
            return $resource('/SapHrInterface/:verb', {}, {
        
            });
        }
    ])
    .factory('TempSapHrService', [
        '$resource', function($resource) {
            return $resource('/TempSapHr/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllHistory: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllHistory'
                    }
                },
                FetchAllHistoryDetail: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllHistoryDetail'
                    }
                },
                FetchOneToUserModel: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOneToUserModel'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                FetchAllForIncidentForward: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllForIncidentForward'
                    }
                },
                FetchAllUserForIncidentForward: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllUserForIncidentForward'
                    }
                },
                FetchAllUserWithException: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllUserWithException'
                    }
                }
            });
        }
    ])
    .factory('IncidentService', [
        '$resource', function($resource) {
            return $resource('/Incident/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllDraftWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllDraftWithPagination'
                    }
                },
                FetchDraft: {
                    method: 'POST',
                    params: {
                        verb: 'FetchDraft'
                    }
                },
                FetchAllPendingWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllPendingWithPagination'
                    }
                },
                FetchAllForwardWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllForwardWithPagination'
                    }
                },
                FetchPending: {
                    method: 'POST',
                    params: {
                        verb: 'FetchPending'
                    }
                },
                FetchAllClosedWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllClosedWithPagination'
                    }
                },
                FetchForViewCommentsWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchForViewCommentsWithPagination'
                    }
                },
                FetchClosed: {
                    method: 'POST',
                    params: {
                        verb: 'FetchClosed'
                    }
                },
                FetchForMerge: {
                    method: 'POST',
                    params: {
                        verb: 'FetchForMerge'
                    }
                },
                FetchForForward: {
                    method: 'POST',
                    params: {
                        verb: 'FetchForForward'
                    }
                },
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchIncidentRcaCategory: {
                    method: 'POST',
                    params: {
                        verb: 'FetchIncidentRcaCategory'
                    }
                },
                SearchForForward: {
                    method: 'POST',
                    params: {
                        verb: 'SearchForForward'
                    }
                },
                SearchForMerge: {
                    method: 'POST',
                    params: {
                        verb: 'SearchForMerge'
                    }
                },
                SearchPending: {
                    method: 'POST',
                    params: {
                        verb: 'SearchPending'
                    }
                },
                SearchDraft: {
                    method: 'POST',
                    params: {
                        verb: 'SearchDraft'
                    }
                },
                SearchClosed: {
                    method: 'POST',
                    params: {
                        verb: 'SearchClosed'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },

                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                DeleteData: {
                    method: 'POST',
                    params: {
                        verb: 'DeleteData'
                    }
                },
                Restore: {
                    method: 'POST',
                    params: {
                        verb: 'Restore'
                    }
                },
                Submit: {
                    method: 'POST',
                    params: {
                        verb: 'Submit'
                    }
                },
                SubmitToNextLevel: {
                    method: 'POST',
                    params: {
                        verb: 'SubmitToNextLevel'
                    }
                },
                ReRoute: {
                    method: 'POST',
                    params: {
                        verb: 'ReRoute'
                    }
                },
                Close: {
                    method: 'POST',
                    params: {
                        verb: 'Close'
                    }
                },
                ReOpen: {
                    method: 'POST',
                    params: {
                        verb: 'ReOpen'
                    }
                },
                MassReRoute: {
                    method: 'POST',
                    params: {
                        verb: 'MassReRoute'
                    }
                },
                MassClose: {
                    method: 'POST',
                    params: {
                        verb: 'MassClose'
                    }
                },
                MassReOpen: {
                    method: 'POST',
                    params: {
                        verb: 'MassReOpen'
                    }
                },
                MassDelete: {
                    method: 'POST',
                    params: {
                        verb: 'MassDelete'
                    }
                },
                FetchTopFIve: {
                    method: 'POST',
                    params: {
                        verb: 'FetchTopFIve'
                    }
                },
                IsAnyDraft: {
                    method: 'POST',
                    params: {
                        verb: 'IsAnyDraft'
                    }
                },
                CheckIsResponsibleForIncident: {
                    method: 'POST',
                    params: {
                        verb: 'CheckIsResponsibleForIncident'
                    }
                },
                FetchAllMySubmissionWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllMySubmissionWithPagination'
                    }
                },
                FetchAllDeletedIncidentWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllDeletedIncidentWithPagination'
                    }
                },
                FetchMergedIncidents: {
                    method: 'POST',
                    params: {
                        verb: 'FetchMergedIncidents'
                    }
                },
                FetchMainIncidents: {
                    method: 'POST',
                    params: {
                        verb: 'FetchMainIncidents'
                    }
                },
                UpdateReadStatus: {
                    method: 'POST',
                    params: {
                        verb: 'UpdateReadStatus'
                    }
                }
            });
        }
    ])
    .factory('IncidentFormService', [
        '$resource', function($resource, UserSessionData) {
            var incident = {
                incident_id: 0,
                incident_no: "",
                reporter_name: "",
                designation_id: 0,
                department_id: 0,
                employee_category_id: 0,
                incident_type_id: 0,
                incident_sub_type_id: 0,
                is_near_miss: false,
                is_witnessed: false,
                witness_name: "",
                witness_contact_no: "",
                witness_relation_type: "",
                witness_relation_other_description: "",
                date_of_occurance: new Date(),
                time_of_occurance: new Date(),
                report_date: new Date(),
                location_id: 0,
                is_potential_sre: false,
                sre_description: "",
                is_potential_media: false,
                is_potential_legal: false,
                routing_group_id: 0,
                committee_group_id: 0,
                incident_description: "",
                situation: "",
                background: "",
                assessment: "",
                recommendations: "",
                sac_likelihood: "",
                sac_consequences: "",
                current_tracking_status: "DRAFT",
                current_tracking_status_holder: "",
                current_tracking_order_level: 0,
                main_template: "",
                main_template_value: {},
                incident_year: 0,
                incident_month: 0,
                incident_sequence: 0,
                Designation: {},
                Department: {},
                EmployeeCategory: {},
                IncidentType: {},
                IncidentSubType: {},
                Location: {},
                RoutingGroup: {},
                CommitteeGroup: {},
                PersonInvolveds: [],
                Attachments: [],
                RcaCategories: [],
                Comments: [],
                Gcs: [],
                AdditionalCcs: [],
                is_edited: true,
                is_forwarded_to_you: false,
                incident_merged: [],
                is_merged: false,
                is_suspected_duplicate: false
            };

            var incidentStatusData = {
                is_edited: true,
                is_forwarded_to_you: false,
                incident_main: "",
                incident_merged: [],
                is_merged: false,
                is_suspected_duplicate: false,
                autopurge: 0,
                form_state_edit: true,
                form_action_button_enabled: true,
                isHighest: false,
                is_custom_role: false,
                custom_role_id: 0,
                is_read_only: false,
                is_read: false
            };

            var btnState = {};
            btnState['btnSaveDraft'] = false;
            btnState['btnForward'] = false;
            btnState['btnReRoute'] = false;
            btnState['btnSubmit'] = false;
            btnState['btnSubmitToNextLevel'] = false;
            btnState['btnViewHistory'] = false;
            btnState['btnClose'] = false;
            btnState['btnReOpen'] = false;
            btnState['btnBackToMerge'] = false;
            btnState['btnAddComment'] = false;
            btnState['btnAddCorrectiveAction'] = false;
            btnState['btnAddFollowUp'] = false;
            btnState['btnDelete'] = false;
            btnState['btnRestore'] = false;
            btnState['btnBack'] = false;
            btnState['btnRead'] = false;
            btnState['btnReadLabel'] = "Read";

            var wizard = {
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

            var incidentAcl = {};

            return {
                set: function(data) {
                    incident = data;
                },
                get: function() {
                    return incident;
                },
                setStatusData: function(data) {
                    incidentStatusData = data;
                },
                getStatusData: function() {
                    return incidentStatusData;
                },
                setWizardData: function(data) {
                    wizard = data;
                },
                getWizardData: function() {
                    return wizard;
                },
                setButtonStateData: function(data) {
                    btnState = data;
                },
                getButtonStateData: function() {
                    return btnState;
                },
                setIncidentAcl: function (data){
                    incidentAcl = data;
                },
                getIncidentAcl: function(){
                    return incidentAcl;
                },
                initialize: function() {
                    incident = {
                        incident_id: 0,
                        incident_no: "",
                        reporter_name: "",
                        designation_id: 0,
                        department_id: 0,
                        employee_category_id: 0,
                        incident_type_id: 0,
                        incident_sub_type_id: 0,
                        is_near_miss: false,
                        is_witnessed: false,
                        witness_name: "",
                        witness_contact_no: "",
                        witness_relation_type: "",
                        witness_relation_other_description: "",
                        date_of_occurance: new Date(),
                        time_of_occurance: new Date(),
                        report_date: new Date(),
                        location_id: 0,
                        is_potential_sre: false,
                        sre_description: "",
                        is_potential_media: false,
                        is_potential_legal: false,
                        routing_group_id: 0,
                        committee_group_id: 0,
                        incident_description: "",
                        situation: "",
                        background: "",
                        assessment: "",
                        recommendations: "",
                        sac_likelihood: "",
                        sac_consequences: "",
                        current_tracking_status: "DRAFT",
                        current_tracking_status_holder: "DRAFT",
                        current_tracking_order_level: 0,
                        main_template: "",
                        main_template_value: {},
                        incident_year: 0,
                        incident_month: 0,
                        incident_sequence: 0,
                        Designation: {},
                        Department: {},
                        EmployeeCategory: {},
                        IncidentType: {},
                        IncidentSubType: {},
                        Location: {},
                        RoutingGroup: {},
                        CommitteeGroup: {},
                        PersonInvolveds: [],
                        Attachments: [],
                        RcaCategories: [],
                        Comments: [],
                        Gcs: [],
                        AdditionalCcs: [],
                        is_edited: true,
                        is_forwarded_to_you: false,
                        incident_merged: [],
                        is_merged: false,
                        is_suspected_duplicate: false
                    };

                    incidentStatusData = {
                        is_edited: true,
                        is_forwarded_to_you: false,
                        incident_main: "",
                        incident_merged: [],
                        is_merged: false,
                        is_suspected_duplicate: false,
                        autopurge: 0,
                        isHighest: false,
                        is_custom_role: false,
                        custom_role_id: 0,
                        is_read_only: false,
                        is_read: false
                    };

                    wizard = {
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
                                title: "SAC",
                                acl: "INCIDENT_TRACK_INCIDENT_SAC_VIEW",
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

                    btnState = {};
                    btnState['btnSaveDraft'] = false;
                    btnState['btnForward'] = false;
                    btnState['btnReRoute'] = false;
                    btnState['btnSubmit'] = false;
                    btnState['btnSubmitToNextLevel'] = false;
                    btnState['btnViewHistory'] = false;
                    btnState['btnClose'] = false;
                    btnState['btnReOpen'] = false;
                    btnState['btnBackToMerge'] = false;
                    btnState['btnAddComment'] = false;
                    btnState['btnAddCorrectiveAction'] = false;
                    btnState['btnAddFollowUp'] = false;
                    btnState['btnDelete'] = false;
                    btnState['btnRestore'] = false;
                    btnState['btnBack'] = false;
                    btnState['btnRead'] = false;
                }
            };
        }
    ])
    .factory('IncidentTrackListTabService', ['$resource', function ($resource) {
        var tabState = {};
        tabState['incidentPending'] = true;
        tabState['incidentClosed'] = false;
        tabState['incidentDeleted'] = false;
        tabState['incidentFollowUps'] = false;
        tabState['incidentForwards'] = false;
        tabState['incidentForwardedToMe'] = false;
        tabState['incidentDraft'] = false;
        tabState['incidentMySubmission'] = false;

        return {
            initialize: function () {
                var tabState = {};
                tabState['incidentPending'] = true;
                tabState['incidentClosed'] = false;
                tabState['incidentDeleted'] = false;
                tabState['incidentFollowUps'] = false;
                tabState['incidentForwards'] = false;
                tabState['incidentForwardedToMe'] = false;
                tabState['incidentDraft'] = false;
                tabState['incidentMySubmission'] = false;
            },
            setState: function (data) {
                tabState = data;
            },
            getState: function () {
                return tabState;
            }
        };
    }])
    .factory('IncidentFollowUpFormService', ['$resource', function ($resource) {
        var incidentFollowUp = {};

        return {
            set: function (data) {
                incidentFollowUp = data;
            },
            get: function () {
                return incidentFollowUp;
            }
        };
    }])
    .factory('IncidentCommentService', ['$resource', function ($resource) {
        return $resource('/IncidentComment/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithReporterView: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithReporterView'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            },
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            FetchFollowUpByUser: {
                method: 'POST',
                params: {
                    verb: 'FetchFollowUpByUser'
                }
            },
            FetchFollowUpSentByUser: {
                method: 'POST',
                params: {
                    verb: 'FetchFollowUpSentByUser'
                }
            },
            FetchAllForViewComments: {
                method: 'POST',
                params: {
                    verb: 'FetchAllForViewComments'
                }
            }
        });
    }])
    .factory('RoutingGroupFormService', ['$resource', function ($resource) {
        var routingGroup = {};

        return {
            set: function (data) {
                routingGroup = data;
            },
            get: function () {
                return routingGroup;
            }
        };
    }])
    .factory('DisciplineService', ['$resource', function ($resource) {
        return $resource('/Discipline/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('PatientClassService', ['$resource', function ($resource) {
        return $resource('/PatientClass/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('PatientDaysService', ['$resource', function ($resource) {
        return $resource('/PatientDays/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('OperationDaysService', ['$resource', function ($resource) {
        return $resource('/OperationDays/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('AEAttendanceService', ['$resource', function ($resource) {
        return $resource('/AEAttendance/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('AdmissionDaysService', ['$resource', function ($resource) {
        return $resource('/AdmissionDays/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('ShiftService', ['$resource', function ($resource) {
        return $resource('/Shift/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('PatientLocationService', ['$resource', function ($resource) {
        return $resource('/PatientLocation/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('IncidentSubTypeService', ['$resource', function ($resource) {
        return $resource('/IncidentSubType/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllByIncidentType: {
                method: 'POST',
                params: {
                    verb: 'FetchAllByIncidentType'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('IncidentTypeReportService', ['$resource', function ($resource) {
        return $resource('/IncidentTypeReport/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllByUserId: {
                method: 'POST',
                params: {
                    verb: 'FetchAllByUserId'
                }
            }
        });
    }])
    .factory('DesignationGroupService', ['$resource', function ($resource) {
        return $resource('/DesignationGroup/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('EmailTemplateService', ['$resource', function ($resource) {
        return $resource('/EmailTemplate/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('EmailQueueService', ['$resource', function ($resource) {
        return $resource('/EmailQueue/:verb', {}, {
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            }
        });
    }])
    .factory('GcsService', ['$resource', function ($resource) {
        return $resource('/Gcs/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('FileService', ['$resource', function ($resource) {
        return $resource('/File/:verb', {}, {
            Download: {
                method: 'POST',
                params: {
                    verb: 'Download'
                }
            }
        });
    }])
    .factory('GcsDetailService', ['$resource', function ($resource) {
        return $resource('/GcsDetail/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll',
                    gcsId: '@gcs_id'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('RootCauseCategoryService', ['$resource', function ($resource) {
        return $resource('/RootCauseCategory/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('RootCauseService', ['$resource', function ($resource) {
        return $resource('/RootCause/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('IncidentRcaCategoryService', ['$resource', function ($resource) {
        return $resource('/IncidentRcaCategory/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            }
        });
    }])
    .factory('IncidentMergeService', ['$resource', function ($resource) {
        return $resource('/IncidentMerge/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            SearchForMerge: {
                method: 'POST',
                params: {
                    verb: 'SearchForMerge'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            },
            FetchSuspectedIncident: {
                method: 'POST',
                params: {
                    verb: 'FetchSuspectedIncident'
                }
            },
            Unmerge: {
                method: 'POST',
                params: {
                    verb: 'Unmerge'
                }
            }
        });
    }])
    .factory('IncidentMergeFormService', ['$resource', function ($resource) {
        var incidentMerge = {};
        return {
            set: function (data) {
                incidentMerge = data;
            },
            get: function () {
                return incidentMerge;
            }
        };
    }])
    .factory('IncidentForwardService', ['$resource', function ($resource) {
        return $resource('/IncidentForward/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllForwardWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllForwardWithPagination'
                }
            },
            FetchAllForwardByMeWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllForwardByMeWithPagination'
                }
            },
            FetchAllForwardToMeWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllForwardToMeWithPagination'
                }
            },
            FetchGuestIncidentForward: {
                method: 'POST',
                params: {
                    verb: 'FetchGuestIncidentForward'
                }
            },
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            SearchForForward: {
                method: 'POST',
                params: {
                    verb: 'SearchForForward'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            SaveOne: {
                method: 'POST',
                params: {
                    verb: 'SaveOne'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('IncidentForwardFormService', ['$resource', function ($resource) {
        var incidentForward = {};
        return {
            set: function (data) {
                incidentForward = data;
            },
            get: function () {
                return incidentForward;
            }
        };
    }])
    .factory('PatientViewService', ['$resource', function ($resource) {
        return $resource('/PatientView/:verb', {}, {
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            }
        });
    }])
    .factory('WorkflowEmployeeService', ['$resource', function ($resource) {
        return $resource('/WorkflowEmployee/:verb', {}, {
            Fetch: {
                method: 'POST',
                params: {
                    verb: 'Fetch'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            }
        });
    }])
    .factory('IncidentSacSevereService', ['$resource', function ($resource) {
        return $resource('/IncidentSacSevere/:verb', {}, {
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('IncidentTypeSevereService', ['$resource', function ($resource) {
        return $resource('/IncidentTypeSevere/:verb', {}, {
            FetchOne: {
                method: 'POST',
                params: {
                    verb: 'FetchOne'
                }
            },
            FetchAll: {
                method: 'POST',
                params: {
                    verb: 'FetchAll'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            },
            Save: {
                method: 'POST',
                params: {
                    verb: 'Save'
                }
            },
            Delete: {
                method: 'POST',
                params: {
                    verb: 'Delete'
                }
            }
        });
    }])
    .factory('SacScoreReportService', ['$resource', function ($resource) {
        return $resource('/SacScoreReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsIncidenceReportService', ['$resource', function ($resource) {
        return $resource('/EnsIncidenceReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsSharpInjuryByDepartmentReportService', ['$resource', function ($resource) {
        return $resource('/EnsSharpInjuryByDepartment/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsSharpInjuryMsotDsotReportService', ['$resource', function ($resource) {
        return $resource('/EnsSharpInjuryMsotDsotReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsSharpInjuryAmongHcwReportService', ['$resource', function ($resource) {
        return $resource('/EnsSharpInjuryAmongHcwReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsWorkplaceAggressionReportService', ['$resource', function ($resource) {
        return $resource('/EnsWorkplaceAggressionReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsWorkplaceAggressionN7ReportService', ['$resource', function ($resource) {
        return $resource('/EnsWorkplaceAggressionN7Report/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('EnsPoliceReportLodgedReportService', ['$resource', function ($resource) {
        return $resource('/EnsPoliceReportLodgedReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('PressureInjuryReportService', ['$resource', function ($resource) {
        return $resource('/PressureInjuryReport/:verb', {}, {
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            }
        });
    }])
    .factory('FallsLocationReportService', ['$resource', function ($resource) {
        return $resource('/FallsLocationReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('IncidentReportService', ['$resource', function ($resource) {
        return $resource('/IncidentReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsExactLocationReportService', ['$resource', function ($resource) {
        return $resource('/FallsExactLocationReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsActivityReportService', ['$resource', function ($resource) {
        return $resource('/FallsActivityReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsLevelInjuryReportService', ['$resource', function ($resource) {
        return $resource('/FallsLevelInjuryReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])

    .factory('FallsInpatientInjuryReportService', ['$resource', function ($resource) {
        return $resource('/FallsInpatientInjuryReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('HAMReportService', ['$resource', function ($resource) {
        return $resource('/HAMReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            },
            GenerateData: {
                method: 'POST',
                params: {
                    verb: 'GenerateData'
                }
            }
        });
    }])
    .factory('MeSafetyCommitteeByLocationReportService', ['$resource', function ($resource) {
        return $resource('/MeSafetyCommitteeByLocationReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeSafetyCommitteeByStaffReportService', ['$resource', function ($resource) {
        return $resource('/MeSafetyCommitteeByStaffReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeNoOfMedicationByStaffDesignationReportService', ['$resource', function ($resource) {
        return $resource('/MeNoOfMedicationErrorAndNearMissByStaffDesignationReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeLevelInjuryReportService', ['$resource', function ($resource) {
        return $resource('/MeLevelInjuryReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeTypeOfMedicationReportService', ['$resource', function ($resource) {
        return $resource('/MeTypeOfMedicationReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeTypeOfMedicationErrorReportService', ['$resource', function ($resource) {
        return $resource('/MeTypeOfMedicationErrorReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeSequentialStageReportService', ['$resource', function ($resource) {
        return $resource('/MeSequentialStageReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('MeNoOfMedicationByDesignationAndSequentialStageReportService', ['$resource', function ($resource) {
        return $resource('/MeNoOfMedicationErrorByDesignationAndSequentialStageReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
     .factory('MeNoOfMedicationByDesignationDisciplineReportService', ['$resource', function ($resource) {
         return $resource('/MeNoOfMedicationErrorAndNearMissByDesignationAndDisciplineReport/:verb', {}, {
             GeneratePdf: {
                 method: 'POST',
                 params: {
                     verb: 'GeneratePdf'
                 }
             },
             GenerateXls: {
                 method: 'POST',
                 params: {
                     verb: 'GenerateXls'
                 }
             }
         });
     }])
    .factory('MeAlliedHealthReportService', ['$resource', function ($resource) {
        return $resource('/MeNoOfAlliedHealthReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsDepartmentWorkloadReportService', ['$resource', function ($resource) {
        return $resource('/FallsDepartmentWorkloadReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsTimeOccurenceReportService', ['$resource', function ($resource) {
        return $resource('/FallsTimeOccurenceReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsShiftReportService', ['$resource', function ($resource) {
        return $resource('/FallsShiftReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsAgeGroupReportService', ['$resource', function ($resource) {
        return $resource('/FallsAgeGroupReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsDisciplineReportService', ['$resource', function ($resource) {
        return $resource('/FallsDisciplineReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('FallsGenderReportService', ['$resource', function ($resource) {
        return $resource('/FallsGenderReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('UserListingReportService', ['$resource', function ($resource) {
        return $resource('/UserListingReport/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('UserAccessMatrixReportService', ['$resource', function ($resource) {
        return $resource('/UserAccessMatrix/:verb', {}, {
            GeneratePdf: {
                method: 'POST',
                params: {
                    verb: 'GeneratePdf'
                }
            },
            GenerateXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateXls'
                }
            }
        });
    }])
    .factory('IncidentLockService', ['$resource', function ($resource) {
        return $resource('/IncidentLock/:verb', {}, {
            LockIncident: {
                method: 'POST',
                params: {
                    verb: 'LockIncident'
                }
            },
            ReleaseLock: {
                method: 'POST',
                params: {
                    verb: 'ReleaseLock'
                }
            },
            DeleteLock: {
                method: 'POST',
                params: {
                    verb: 'DeleteLock'
                }
            },
            ExtendLockExpiredTime: {
                method: 'POST',
                params: {
                    verb: 'ExtendLockExpiredTime'
                }
            },
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            }
        });
    }])
    .factory('IncidentPrintService', ['$resource', function ($resource) {
        return $resource('/IncidentPrint/:verb', {}, {
            Print: {
                method: 'POST',
                params: {
                    verb: 'Print'
                }
            }
        });
    }])
    .factory('LogService', ['$resource', function ($resource) {
        return $resource('/Log/:verb', {}, {
            FetchAllWithPagination: {
                method: 'POST',
                params: {
                    verb: 'FetchAllWithPagination'
                }
            }
        });
    }])
    .factory('DashboardService', ['$resource', function ($resource) {
        return $resource('/Dashboard/:verb', {}, {
            GetIncidentMonthlyData: {
                method: 'POST',
                params: {
                    verb: 'GetIncidentMonthlyData'
                }
            },
            GenerateIncidentMonthlyXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateIncidentMonthlyXls'
                }
            },
            GetIncidentRateMonthlyData: {
                method: 'POST',
                params: {
                    verb: 'GetIncidentRateMonthlyData'
                }
            },
            GenerateIncidentRateMonthlyXls: {
                method: 'POST',
                params: {
                    verb: 'GenerateIncidentRateMonthlyXls'
                }
            },
            GetContaminatedSharpInjuryData: {
                method: 'POST',
                params: {
                    verb: 'GetContaminatedSharpInjuryData'
                }
            },
            GetContaminatedSharpInjuryXls: {
                method: 'POST',
                params: {
                    verb: 'GetContaminatedSharpInjuryXls'
                }
            },
            GetIncidentRateYearlyData: {
                method: 'POST',
                params: {
                    verb: 'GetIncidentRateYearlyData'
                }
            },
            GetIncidentRateYearlyXls: {
                method: 'POST',
                params: {
                    verb: 'GetIncidentRateYearlyXls'
                }
            },
            GetIncidentOutstandingData: {
                method: 'POST',
                params: {
                    verb: 'GetIncidentOutstandingData'
                }
            },
            GetIncidentOutstandingXls: {
                method: 'POST',
                params: {
                    verb: 'GetIncidentOutstandingXls'
                }
            }
        });
    }])
    .factory('MedicationNameService', [
        '$resource', function($resource) {
            return $resource('/MedicationName/:verb', {}, {
                FetchOne: {
                    method: 'POST',
                    params: {
                        verb: 'FetchOne'
                    }
                },
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByInstitutionId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByInstitutionId'
                    }
                }
            });
        }
    ])
    .factory('IncidentMorbidityReviewService', [
        '$resource', function($resource) {
            return $resource('/IncidentMorbidityReview/:verb', {}, {
                FetchByIncidentId: {
                    method: 'POST',
                    params: {
                        verb: 'FetchByIncidentId'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                }
            });
        }
    ])

    .factory('AtkJenisBisnisService', [
        '$resource', function($resource) {
            return $resource('/AtkJenisBisnis/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('AtkBdatkService', [
        '$resource', function($resource) {
            return $resource('/AtkBdatk/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('FaculService', [
        '$resource', function($resource) {
            return $resource('/Facul/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllProportionalWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllProportionalWithPagination'
                    }
                }
            });
        }
    ])
    .factory('OpenCoverService', [
        '$resource', function($resource) {
            return $resource('/OpenCover/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('StatementService', [
        '$resource', function($resource) {
            return $resource('/Statement/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('CompanyService', [
        '$resource', function($resource) {
            return $resource('/Company/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByCompCode: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByCompCode'
                    }
                }
            });
        }
    ])
    .factory('StatusService', [
        '$resource', function($resource) {
            return $resource('/Status/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                }
            });
        }
    ])
    .factory('SubTypeService', [
        '$resource', function($resource) {
            return $resource('/SubType/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllBySubTypeCode: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllBySubTypeCode'
                    }
                }
            });
        }
    ])
    .factory('ClassService', [
        '$resource', function($resource) {
            return $resource('/Class/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByClassCode: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByClassCode'
                    }
                }
            });
        }
    ])
    .factory('MainClassService', [
        '$resource', function($resource) {
            return $resource('/MainClass/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByMainClassCode: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByMainClassCode'
                    }
                }
            });
        }
    ])
    .factory('SterrService', [
        '$resource', function($resource) {
            return $resource('/Sterr/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllBySterrCode: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllBySterrCode'
                    }
                }
            });
        }
    ])
    .factory('TreatyService', [
        '$resource', function($resource) {
            return $resource('/Treaty/:verb', {}, {
                FetchAll: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAll'
                    }
                },
                FetchAllWithPagination: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllWithPagination'
                    }
                },
                Save: {
                    method: 'POST',
                    params: {
                        verb: 'Save'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {
                        verb: 'Delete'
                    }
                },
                FetchAllByTreatyCode: {
                    method: 'POST',
                    params: {
                        verb: 'FetchAllByTreatyCode'
                    }
                }
            });
        }
    ])
;

