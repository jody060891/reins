angular.module('PKBL')
    .controller('FacultativeRiskDetailsProporListCtrl',
        function FacultativeRiskDetailsProporListCtrl($rootScope, $http, $timeout, $scope, $resource, $location, $modal, UserAclSessionData,
                                          ToastMessageService, SessionService, AtkJenisBisnisService, FaculService, StatusService,
                                          CompanyService, SubTypeService, ClassService, MainClassService, SterrService, FileUploader) {
            SessionService.setAclSession(UserAclSessionData);

            SessionService.setAcltoScope($scope);

            $scope.mainScope = $scope;
            $scope.isDataChange = true;
            $scope.SearchQuery = {
                page: 1,
                row_per_page: 10,
                sort_by: 'FacOpnCode',
                is_sort_asc: true,
                total_data: 0,
                search: {
                    keyword: $scope.keyword,
                    fields: ['FacOpnCode']
                }
            };

            $scope.facul = {};
            $scope.keyword = {};

            $scope.onMainPageTemplate = "";
            $scope.onPage2Template = "";
            $scope.onPage3Template = "";
            $scope.onPage4Template = "";
            $scope.isFirstSearch = true;
            $scope.isEditState = true;
            $scope.isAddNew = false;
            $scope.isDataSelected = false;
            $scope.faculTemp = {};

            $scope.currentIndexPosition = 0;
            $scope.selectedPage = 1;

            $scope.FetchAllStatus = function(){
                var jsonResult = StatusService.FetchAll(function(){
                    var data = jsonResult.data;
                    $scope.listStatus = [];
                    $scope.listStatus = data;

                });
            };

            $scope.FetchAllStatus();

            $scope.FetchAllCompanies = function(str){
                var jsonResult = CompanyService.FetchAllByCompCode({compCode:str}, function(){
                    var data = jsonResult.data;
                    $scope.listCompany = [];
                    $scope.listCompany = data;

                });
            };


            $scope.FetchAllBrokers = function(str){
                var jsonResult = CompanyService.FetchAllByCompCode({compCode:str}, function(){
                    var data = jsonResult.data;
                    $scope.listBroker = [];
                    $scope.listBroker = data;

                });
            };

            $scope.FetchAllSubTypes = function(str){
                var jsonResult = SubTypeService.FetchAllBySubTypeCode({subTypeCode:str}, function(){
                    var data = jsonResult.data;
                    $scope.listSubType = [];
                    $scope.listSubType = data;

                });
            };

            $scope.FetchAllSubClasses = function(str){
                var jsonResult = ClassService.FetchAllByClassCode({classCode:str}, function(){
                    var data = jsonResult.data;
                    $scope.listSubClass = [];
                    $scope.listSubClass = data;

                });
            };

            $scope.FetchAllMainClasses = function(str){
                var jsonResult = MainClassService.FetchAllByMainClassCode({mClassCode:str}, function(){
                    var data = jsonResult.data;
                    $scope.listMainClass = [];
                    $scope.listMainClass = data;

                });
            };

            $scope.FetchAllTerritories = function(str){
                var jsonResult = SterrService.FetchAllBySterrCode({sterrCode:str}, function(){
                    var data = jsonResult.data;
                    $scope.listSterr = [];
                    $scope.listSterr = data;

                });
            };


            $scope.companyChanged = function($parent){
                $scope.FetchAllCompanies($parent);
            };

            $scope.brokerChanged = function($parent){
                $scope.FetchAllBrokers($parent);
            };

            $scope.subTypeChanged = function($parent){
                $scope.FetchAllSubTypes($parent);
            };

            $scope.subClassChanged = function($parent){
                $scope.FetchAllSubClasses($parent);
            };

            $scope.mainClassChanged = function($parent){
                $scope.FetchAllMainClasses($parent);
            };

            $scope.territoryChanged = function($parent){
                $scope.FetchAllTerritories($parent);
            };

            $scope.selectedStatus = function($parent){
                if($parent != null){
                    $scope.facul.FacAccSts = $parent.originalObject.StatusCode;
                    $scope.facul.MasterStatus = $parent.originalObject;
                }

            };

            $scope.selectedCompany = function($parent){
                if($parent != null) {
                    $scope.facul.FacCedant = $parent.originalObject.CompCode;
                    $scope.facul.MasterCompany = $parent.originalObject;
                }

            };

            $scope.selectedBroker = function($parent){
                if($parent != null) {
                    $scope.facul.FacBroker = $parent.originalObject.CompCode;
                    $scope.facul.MasterBroker = $parent.originalObject;
                }

            };

            $scope.selectedSubType = function($parent){
                if($parent != null) {
                    $scope.facul.FacSubType = $parent.originalObject.SubtypeCode;
                    $scope.facul.MasterSubType = $parent.originalObject;
                }

            };

            $scope.selectedSubClass = function($parent){
                if($parent != null) {
                    $scope.facul.FacSubClass = $parent.originalObject.ClassCode;
                    $scope.facul.MasterSubClass = $parent.originalObject;
                }

            };

            $scope.selectedMainClass = function($parent){
                if($parent != null) {
                    $scope.facul.FacMainClass = $parent.originalObject.MclassCode;
                    $scope.facul.MasterMainClass = $parent.originalObject;
                }

            };

            $scope.selectedTerritory = function($parent){
                if($parent != null) {
                    $scope.facul.FacSterr = $parent.originalObject.SterrCode;
                    $scope.facul.MasterSterr = $parent.originalObject;
                }

            };

            $scope.onFetchMainPage = function(){
                if ($scope.onMainPageTemplate.length <= 0){
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/facultativeRiskDetailsPropor/facultative-risk-detail-propor-template/main-page.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.onMainPageTemplate = template;

                    });
                }
                //$timeout(function(){$scope.FetchAllNotApprovedYetWithPagination()}, 100);
            };

            $scope.onFetchPage2 = function(){
                if ($scope.onPage2Template.length <= 0 || $scope.isDataChange){
                    $scope.onPage2Template = "";
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/faculDetails/open-cover-template/page-2.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.isDataChange = false;
                        $scope.onPage2Template = template;
                    });
                }
                // $timeout(function(){$scope.FetchAllStatus()}, 100);
            };

            $scope.onFetchPage3 = function(){
                if ($scope.onPage3Template.length <= 0 || $scope.isDataChange){
                    $scope.onPage3Template = "";
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/faculDetails/open-cover-template/page-3.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.isDataChange = false;
                        $scope.onPage3Template = template;
                    });
                }
                // $timeout(function(){$scope.FetchAllStatus()}, 100);
            };

            $scope.onFetchPage4 = function(){
                if ($scope.onPage4Template.length <= 0 || $scope.isDataChange){
                    $scope.onPage4Template = "";
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/faculDetails/open-cover-template/page-4.html";
                    $http.get(url).then(function(result) {
                        var template = result.data;
                        $scope.isDataChange = false;
                        $scope.onPage4Template = template;
                    });
                }
                // $timeout(function(){$scope.FetchAllStatus()}, 100);
            };

            $scope.onFetchMainPage();

            $scope.FetchAllWithPagination = function(){
                var jsonResult = FaculService.FetchAllProportionalWithPagination(
                    {
                        searchQuery: $scope.SearchQuery,
                        faculSearch: $scope.keyword
                    }, function(){
                    var result_data = jsonResult.data;
                    if(result_data.IsSuccess){
                        $scope.listfacul = result_data.Data.list;
                        $scope.SearchQuery.total_data = result_data.Data.totalData;
                        if($scope.listfacul.length > 0 && $scope.isFirstSearch){
                            $scope.facul = $scope.listfacul[$scope.currentIndexPosition-($scope.selectedPage-1)*10];
                            $scope.isFirstSearch= false;
                            $scope.isEditState = false;
                            $scope.isDataSelected = true;
                            $scope.faculTemp = angular.copy($scope.facul);
                        }

                    }
                });
            };

            $scope.onCreateNew = function(){
                $scope.facul = {};
                $scope.isEditState = true;
                $scope.isDataSelected = false;
                $scope.isAddNew = true;
                $scope.currentIndexPosition = -1;
            };

            $scope.onSave = function(){
                $scope.isEditState = false;

                $scope.isDataSelected = false;
                if(!$scope.isAddNew){
                    $scope.isDataSelected = true;
                }

                $scope.isAddNew = false;
            };

            $scope.onEdit = function () {
                $scope.isEditState = true;
                $scope.isDataSelected = false;

                $scope.faculTemp = angular.copy($scope.facul);
            };

            $scope.prevData = function(){
                if($scope.currentIndexPosition-($scope.selectedPage-1)*10 == 0){
                    $scope.selectedPage--;
                }
                $scope.currentIndexPosition--;
                if($scope.selectedPage != $scope.SearchQuery.page){
                    $scope.SearchQuery.page = $scope.selectedPage;
                    $scope.FetchAllWithPagination();
                }else{
                    $scope.facul = $scope.listfacul[$scope.currentIndexPosition-($scope.selectedPage-1)*10];
                }
                $scope.isDataSelected = true;

            };

            $scope.nextData = function(){
                if($scope.currentIndexPosition-($scope.selectedPage-1)*10 == $scope.listfacul.length-1){
                    $scope.selectedPage++;
                }
                $scope.currentIndexPosition++;
                if($scope.selectedPage != $scope.SearchQuery.page){
                    $scope.SearchQuery.page = $scope.selectedPage;
                    $scope.FetchAllWithPagination();
                }else{
                    $scope.facul = $scope.listfacul[$scope.currentIndexPosition-($scope.selectedPage-1)*10];
                }
            };

            $scope.onSort = function (sortField) {
                if ($scope.SearchQuery.sort_by == sortField)
                    $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
                else
                    $scope.SearchQuery.is_sort_asc = true;
                $scope.SearchQuery.sort_by = sortField;
                $scope.FetchAllWithPagination();
            };

            $scope.onPageChanged = function (page) {
                $scope.SearchQuery.page = page;
                //console.log($scope.SearchQuery);
                $scope.FetchAllWithPagination();
            };

            $scope.onViewDetail = function(data, index){
                $scope.isDataSelected = true;
                $scope.isDataChange = true;
                $scope.facul = angular.copy(data);
                $scope.isEditState = false;
                $scope.selectedPage= $scope.SearchQuery.page;
                $scope.currentIndexPosition = index+($scope.selectedPage-1)*10;
                $scope.faculTemp = angular.copy($scope.facul);
            };

            $scope.onResetForm = function(){
                $scope.facul = {};
            };

            $scope.onCancel = function(){
                $scope.facul = {};
                $scope.isEditState = false;
                $scope.isDataSelected = false;

                if(!$scope.isAddNew){
                    $scope.facul= angular.copy($scope.faculTemp);
                    $scope.isDataSelected = true;
                }
                $scope.isAddNew = false;

            };


            $scope.onSearch = function(){
                $scope.keyword = angular.copy($scope.facul);

                if($scope.facul != null){
                    $scope.keyword.MasterSubType = null;
                    $scope.keyword.MasterCompany = null;
                    $scope.keyword.MasterSterr = null;
                    $scope.keyword.MasterMainClass = null;
                    $scope.keyword.MasterClass = null;
                    $scope.keyword.MasterBroker = null;
                    $scope.keyword.MasterStatus = null;
                    $scope.keyword.MasterSubClass = null;
                };

                $scope.isDataChange = true;

                $scope.isFirstSearch= true;
                $scope.currentIndexPosition = 0;
                $scope.selectedPage = 1;
                $scope.FetchAllWithPagination();
            };

            $scope.datePickerOpen = function (id) {
                $timeout(function () {
                    $("#" + id).focus();
                });
            };

            jQuery(document).on('keypress', function(e){
                $scope.$apply($scope.keyPressed(e));
            });

            $scope.keyPressed = function(e){
            };



            $scope.onUpload = function(){
                document.getElementById('docUpload').click();

            };

            var uploader = $scope.uploader = new FileUploader({
                url: '/File/UploadfaculDoc',
                autoUpload: true,
                removeAfterUpload: true
            });

            $scope.calculateTotalSize = function(){
                $scope.totalFileSize = 0;
                angular.forEach($scope.facul.MasterDocuments, function(att, key){
                    if (att.is_active) {
                        $scope.totalFileSize += att.filesize / 1.00;
                    }
                });
                $scope.totalFileSize = $scope.totalFileSize / 1024.00 / 1024.00;
            };

            uploader.filters.push({
                name: 'fileTypeFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.name.slice(item.name.lastIndexOf('.') + 1) + '|';
                    var whitelist = '|jpg|png|jpeg|bmp|gif|txt|doc|docx|xls|xlsx|ppt|pptx|pdf|rtf|csv|zip|7z|rar|';
                    var valid = whitelist.indexOf(type.toLowerCase()) !== -1;
                    if (!valid) {
                        ToastMessageService.removeAlerts();
                        ToastMessageService.addAlerts('danger', "Please upload whitelisted file only (image, txt, doc, excel, pdf, zip)");
                    }
                    return valid;
                }
            });

            uploader.filters.push({
                name: 'fileNameFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    var isExists = false;
                    var fileName = item.name;
                    angular.forEach($scope.facul.MasterDocuments, function(att, key){
                        if (att.TrtimgFname == fileName){
                            isExists = true;
                        }
                    });
                    if (isExists) {
                        ToastMessageService.removeAlerts();
                        ToastMessageService.addAlerts('danger', "File already exists.");
                    }
                    return !isExists;
                }
            });

            uploader.onBeforeUploadItem = function (item) {
                var totalFileSize = 0;
                angular.forEach($scope.facul.MasterDocuments, function(att, key){
                    // if (att.is_active) {
                    //     totalFileSize += att.filesize / 1.00;
                    // }
                });

                item.formData.push({
                    ofrNo: $scope.facul.FacOfrNo,
                    totalSizeCurrentAttachment: totalFileSize
                });
            };

            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                if (!$scope.facul.MasterDocuments) $scope.facul.MasterDocuments = [];
                if (response.Content) {
                    var content = response.Content.split('|');
                    var status = content[0];
                    var fileSize = content[2];
                    var datetime = content[3];

                    if (status == "1"){
                        $scope.facul.MasterDocuments.push({
                            TrtimgFname: fileItem.file.name,
                            TrtimgDatetime: datetime
                        });
                        $scope.successFile++;
                        $scope.calculateTotalSize();
                    }
                    else {
                        var errMsg = content[1];
                        uploadErrorMessage = errMsg;
                        $scope.failedFile++;
                    }

                }
                else {
                    uploadErrorMessage = response.Message;
                    $scope.failedFile++;
                }
            };

            uploader.onErrorItem = function (item, response, status, headers) {
                if (response.message) {
                    item.errorMessage = response.message;
                    uploadErrorMessage = response.message;
                } else {
                    item.errorMessage = response.match(/<title[^>]*>[\s\S]*<\/title>/gi)[0];
                    item.errorMessage = item.errorMessage.replace("<title>", "");
                    item.errorMessage = item.errorMessage.replace("</title>", "");
                }

                $scope.failedFile++;
            };

            uploader.onAfterAddingAll = function (addedItems) {
                $scope.totalFile = addedItems.length;
                $scope.successFile = 0;
                $scope.failedFile = 0;
            };

            uploader.onCompleteAll = function () {
                ToastMessageService.removeAlerts();

                var str = "";

                if ($scope.successFile > 0) {
                    str += $scope.successFile + "/" + $scope.totalFile + " uploaded successfully. ";
                }

                if ($scope.failedFile > 0) {
                    str += $scope.failedFile + "/" + $scope.totalFile + " upload failed. " + uploadErrorMessage;
                }

                if ($scope.failedFile > 0) {
                    ToastMessageService.addAlerts('danger', str);
                } else {
                    ToastMessageService.addAlerts('success', str);
                }
            };

            $scope.download = function (att) {
                var ofrNo = 0;
                if ($scope.facul.FacOfrNo == null){
                    ofrNo = 0;
                }
                else {
                    ofrNo = $scope.facul.FacOfrNo;
                }
                $window.open("/File/DownloadIncidentAttachment?name=" + encodeURIComponent(att.filename) + "&ofrNo=" + ofrNo);
                //var file = FileService.Download({
                //    name: att.filename
                //}, function () {
                //});
            };

            $scope.onDeleteAttachment = function (att){
                if (confirm('Are you sure you want to delete this attachment?')) {

                    ToastMessageService.addAlerts('success', "File removed successfully");
                    $scope.calculateTotalSize();
                }
            };

        });
