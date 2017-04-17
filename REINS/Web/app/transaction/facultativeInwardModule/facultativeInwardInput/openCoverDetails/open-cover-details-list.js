angular.module('PKBL')
    .controller('OpenCoverDetailsListCtrl',
        function OpenCoverDetailsListCtrl($rootScope, $http, $window, $timeout, $scope, $resource, $location, $modal, UserAclSessionData, OpenCoverFormService,
                                          ToastMessageService, SessionService, AtkJenisBisnisService, OpenCoverService, StatusService,
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

            $scope.openCover = {};
            $scope.keyword = {};

            $scope.onMainPageTemplate = "";
            $scope.onPage2Template = "";
            $scope.onPage3Template = "";
            $scope.onPage4Template = "";
            $scope.isFirstSearch = true;
            $scope.isEditState = true;
            $scope.isSearchState = true;
            $scope.isAddNew = false;
            $scope.isDataSelected = false;
            $scope.isSaveClicked = false;
            $scope.openCoverTemp = {};

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
                    $scope.openCover.FacAccSts = $parent.originalObject.StatusCode;
                    $scope.openCover.MasterStatus = $parent.originalObject;
                }

            };

            $scope.selectedCompany = function($parent){
                if($parent != null) {
                    $scope.openCover.FacCedant = $parent.originalObject.CompCode;
                    $scope.openCover.MasterCompany = $parent.originalObject;
                }

            };

            $scope.selectedBroker = function($parent){
                if($parent != null) {
                    $scope.openCover.FacBroker = $parent.originalObject.CompCode;
                    $scope.openCover.MasterBroker = $parent.originalObject;
                }

            };

            $scope.selectedSubType = function($parent){
                if($parent != null) {
                    $scope.openCover.FacSubType = $parent.originalObject.SubtypeCode;
                    $scope.openCover.MasterSubType = $parent.originalObject;
                }

            };

            $scope.selectedSubClass = function($parent){
                if($parent != null) {
                    $scope.openCover.FacSubClass = $parent.originalObject.ClassCode;
                    $scope.openCover.MasterSubClass = $parent.originalObject;
                }

            };

            $scope.selectedMainClass = function($parent){
                if($parent != null) {
                    $scope.openCover.FacMainClass = $parent.originalObject.MclassCode;
                    $scope.openCover.MasterMainClass = $parent.originalObject;
                }

            };

            $scope.selectedTerritory = function($parent){
                if($parent != null) {
                    $scope.openCover.FacSterr = $parent.originalObject.SterrCode;
                    $scope.openCover.MasterSterr = $parent.originalObject;
                }

            };

            $scope.onFetchMainPage = function(){
                if ($scope.onMainPageTemplate.length <= 0){
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/openCoverDetails/open-cover-template/main-page.html";
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
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/openCoverDetails/open-cover-template/page-2.html";
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
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/openCoverDetails/open-cover-template/page-3.html";
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
                    var url = "app/transaction/facultativeInwardModule/facultativeInwardInput/openCoverDetails/open-cover-template/page-4.html";
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
                var jsonResult = OpenCoverService.FetchAllWithPagination(
                    {
                        searchQuery: $scope.SearchQuery,
                        facOpnCode: $scope.keyword
                    }, function(){
                    var result_data = jsonResult.data;
                    if(result_data.IsSuccess){
                        $scope.listOpenCover = result_data.Data.list;
                        $scope.SearchQuery.total_data = result_data.Data.totalData;
                        if($scope.listOpenCover.length > 0 && $scope.isFirstSearch){
                            $scope.openCover = $scope.listOpenCover[$scope.currentIndexPosition-($scope.selectedPage-1)*10];
                            $scope.isFirstSearch= false;
                            $scope.isEditState = false;
                            $scope.isDataSelected = true;
                            $scope.openCoverTemp = angular.copy($scope.openCover);
                        }

                    }
                });
            };

            $scope.onCreateNew = function(){
                OpenCoverFormService.setInitialize();
                $scope.isSearchState = false;
                $scope.openCover = OpenCoverFormService.get();
                // $scope.openCover = {};
                $scope.isEditState = true;
                $scope.isDataSelected = false;
                $scope.isAddNew = true;
                $scope.currentIndexPosition = -1;
            };

            $scope.setInitializeValidation = function(){
                $scope.validation = {};
                $scope.validation.FacOfrNo = false;
                $scope.validation.FacType = false;
                $scope.validation.FacSubType = false;
                $scope.validation.FacOpnCode = false;
                $scope.validation.FacComDate = false;
                $scope.validation.FacExpDate = false;
                $scope.validation.FacCedant = false;
                $scope.validation.FacBroker = false;
                $scope.validation.FacSource = false;
                $scope.validation.FacMainClass = false;
                $scope.validation.FacSubClass = false;
                $scope.validation.FacSterr = false;
                $scope.validation.FacCurrency = false;
                $scope.validation.FacAccSts = false;
                $scope.validation.FacRnSts = false;
                $scope.validation.FacWrtShr = false;
                $scope.validation.FacSndShr = false;
                $scope.validation.FacTotsi = false;
                $scope.validation.FacCcsi = false;
                $scope.validation.FacCcRetn = false;
                $scope.validation.FacOursi = false;
                $scope.validation.FacGpremium = false;
                $scope.validation.FacNpremium = false;
                $scope.validation.FacAccsi = false;
                $scope.validation.FacDeductible = false;
                $scope.validation.FacIndemnity = false;
                $scope.validation.FacMinPrem = false;
                $scope.validation.FacDepPrem = false;
            };

            $scope.isValid = function(){
                $scope.setInitializeValidation();

                if($scope.openCover.FacOfrNo != null && $scope.openCover.FacOfrNo !== "")
                    $scope.validation.FacOfrNo = true;


                if($scope.openCover.FacType != null && $scope.openCover.FacType !== "")
                    $scope.validation.FacType = true;

                if($scope.openCover.FacSubType != null && $scope.openCover.FacSubType !== "")
                    $scope.validation.FacSubType = true;

                if($scope.openCover.FacOpnCode != null && $scope.openCover.FacOpnCode !== "")
                    $scope.validation.FacOpnCode = true;

                if($scope.openCover.FacComDate != null && $scope.openCover.FacComDate !== "")
                    $scope.validation.FacComDate = true;

                if($scope.openCover.FacExpDate != null && $scope.openCover.FacExpDate !== "")
                    $scope.validation.FacExpDate = true;

                if($scope.openCover.FacCedant != null && $scope.openCover.FacCedant !== "")
                    $scope.validation.FacCedant = true;

                if($scope.openCover.FacBroker != null && $scope.openCover.FacBroker !== "")
                    $scope.validation.FacBroker = true;

                if($scope.openCover.FacSource != null && $scope.openCover.FacSource !== "")
                    $scope.validation.FacSource = true;

                if($scope.openCover.FacMainClass != null && $scope.openCover.FacMainClass !== "")
                    $scope.validation.FacMainClass = true;

                if($scope.openCover.FacSubClass != null && $scope.openCover.FacSubClass !== "")
                    $scope.validation.FacSubClass = true;

                if($scope.openCover.FacSterr != null && $scope.openCover.FacSterr !== "")
                    $scope.validation.FacSterr = true;

                if($scope.openCover.FacCurrency != null && $scope.openCover.FacCurrency !== "")
                    $scope.validation.FacCurrency = true;

                if($scope.openCover.FacAccSts != null && $scope.openCover.FacAccSts !== "")
                    $scope.validation.FacAccSts = true;

                if($scope.openCover.FacRnSts != null && $scope.openCover.FacRnSts !== "")
                    $scope.validation.FacRnSts = true;

                if($scope.openCover.FacWrtShr != null && $scope.openCover.FacWrtShr !== "")
                    $scope.validation.FacWrtShr = true;

                if($scope.openCover.FacSndShr != null && $scope.openCover.FacSndShr !== "")
                    $scope.validation.FacSndShr = true;

                if($scope.openCover.FacTotsi != null && $scope.openCover.FacTotsi !== "")
                    $scope.validation.FacTotsi = true;

                if($scope.openCover.FacCcsi != null && $scope.openCover.FacCcsi !== "")
                    $scope.validation.FacCcsi = true;

                if($scope.openCover.FacCcRetn != null && $scope.openCover.FacCcRetn !== "")
                    $scope.validation.FacCcRetn = true;

                if($scope.openCover.FacOursi != null && $scope.openCover.FacOursi !== "")
                    $scope.validation.FacOursi = true;

                if($scope.openCover.FacGpremium != null && $scope.openCover.FacGpremium !== "")
                    $scope.validation.FacGpremium = true;

                if($scope.openCover.FacNpremium != null && $scope.openCover.FacNpremium !== "")
                    $scope.validation.FacNpremium = true;

                if($scope.openCover.FacAccsi != null && $scope.openCover.FacAccsi !== "")
                    $scope.validation.FacAccsi = true;

                if($scope.openCover.FacDeductible != null && $scope.openCover.FacDeductible !== "")
                    $scope.validation.FacDeductible = true;

                if($scope.openCover.FacIndemnity != null && $scope.openCover.FacIndemnity !== "")
                    $scope.validation.FacIndemnity = true;

                if($scope.openCover.FacMinPrem != null && $scope.openCover.FacMinPrem !== "")
                    $scope.validation.FacMinPrem = true;

                if($scope.openCover.FacDepPrem != null && $scope.openCover.FacDepPrem !== "")
                    $scope.validation.FacDepPrem = true;

                return  $scope.validation.FacOfrNo && $scope.validation.FacType &&
                        $scope.validation.FacSubType && $scope.validation.FacOpnCode &&
                        $scope.validation.FacComDate && $scope.validation.FacExpDate &&
                        $scope.validation.FacCedant && $scope.validation.FacBroker &&
                        $scope.validation.FacSource && $scope.validation.FacMainClass &&
                        $scope.validation.FacSubClass && $scope.validation.FacSterr &&
                        $scope.validation.FacCurrency && $scope.validation.FacAccSts &&
                        $scope.validation.FacWrtShr &&
                        $scope.validation.FacSndShr && $scope.validation.FacTotsi &&
                        $scope.validation.FacCcsi && $scope.validation.FacCcRetn &&
                        $scope.validation.FacOursi && $scope.validation.FacGpremium &&
                        $scope.validation.FacNpremium && $scope.validation.FacAccsi;
                    // $scope.validation.FacRnSts &&
                    // $scope.validation.FacDeductible && $scope.validation.FacIndemnity &&
                        // $scope.validation.FacMinPrem && $scope.validation.FacDepPrem;

            };

            $scope.onSave = function(){
                $scope.isSaveClicked = true;
                if($scope.isValid()){
                    var jsonResult = OpenCoverService.Save($scope.openCover, function(){
                        var data_result = jsonResult.data;
                        if(data_result.IsSuccess){
                            $scope.isEditState = false;

                            $scope.isDataSelected = false;
                            if(!$scope.isAddNew){
                                $scope.isDataSelected = true;
                            }
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts("success", "Saved Successfully");
                            $scope.isAddNew = false;
                        }else{
                            ToastMessageService.removeAlerts();
                            ToastMessageService.addAlerts("danger", data_result.Message);
                        }
                        $scope.isSaveClicked = false;
                    });
                }else{
                    ToastMessageService.removeAlerts();
                    ToastMessageService.addAlerts("danger", "Please complete the mandatory fields");
                }
            };

            $scope.onEdit = function () {
                $scope.isSearchState = false;
                $scope.isEditState = true;
                $scope.isDataSelected = false;

                $scope.openCoverTemp = angular.copy($scope.openCover);
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
                    $scope.openCover = $scope.listOpenCover[$scope.currentIndexPosition-($scope.selectedPage-1)*10];
                }
                $scope.isDataSelected = true;

            };

            $scope.nextData = function(){
                if($scope.currentIndexPosition-($scope.selectedPage-1)*10 == $scope.listOpenCover.length-1){
                    $scope.selectedPage++;
                }
                $scope.currentIndexPosition++;
                if($scope.selectedPage != $scope.SearchQuery.page){
                    $scope.SearchQuery.page = $scope.selectedPage;
                    $scope.FetchAllWithPagination();
                }else{
                    $scope.openCover = $scope.listOpenCover[$scope.currentIndexPosition-($scope.selectedPage-1)*10];
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
                $scope.isSearchState = false;
                $scope.isDataSelected = true;
                $scope.isDataChange = true;
                $scope.isSaveClicked = false;
                $scope.openCover = angular.copy(data);
                $scope.isEditState = false;
                $scope.selectedPage= $scope.SearchQuery.page;
                $scope.currentIndexPosition = index+($scope.selectedPage-1)*10;
                $scope.openCoverTemp = angular.copy($scope.openCover);
            };

            $scope.onResetForm = function(){
                $scope.openCover = {};
            };

            $scope.onCancel = function(){
                $scope.openCover = {};
                $scope.isEditState = false;
                $scope.isDataSelected = false;
                $scope.isSaveClicked = false;

                if(!$scope.isAddNew){
                    $scope.openCover= angular.copy($scope.openCoverTemp);
                    $scope.isDataSelected = true;
                }
                $scope.isAddNew = false;

            };


            $scope.onSearch = function(){
                $scope.isSaveClicked = false;
                if(!$scope.isSearchState){
                    $scope.isSearchState = true;
                    $scope.openCover = {};
                    $scope.isDataSelected = false;
                    $scope.isEditState = true;
                }else{
                    $scope.keyword = angular.copy($scope.openCover);

                    if($scope.openCover != null){
                        $scope.keyword.MasterSubType = null;
                        $scope.keyword.MasterCompany = null;
                        $scope.keyword.MasterSterr = null;
                        $scope.keyword.MasterMainClass = null;
                        $scope.keyword.MasterClass = null;
                        $scope.keyword.MasterBroker = null;
                        $scope.keyword.MasterStatus = null;
                        $scope.keyword.MasterSubClass = null;
                    }

                    $scope.isDataChange = true;

                    $scope.isFirstSearch= true;
                    $scope.currentIndexPosition = 0;
                    $scope.selectedPage = 1;
                    $scope.isSearchState = false;
                    $scope.FetchAllWithPagination();
                }

            };

            $scope.onDownload = function(){
                $window.open("/File/Download?name=Registration Form.doc");
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

            // window.addEventListener('message',function(event) {
            //     $("#"+event.data).trigger("click");
            //
            // },false);



            $scope.onUpload = function(){
                document.getElementById('docUpload').click();

            };

            var uploader = $scope.uploader = new FileUploader({
                url: '/File/UploadOpenCoverDoc',
                autoUpload: true,
                removeAfterUpload: true
            });

            $scope.calculateTotalSize = function(){
                $scope.totalFileSize = 0;
                angular.forEach($scope.openCover.MasterDocuments, function(att, key){
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
                    angular.forEach($scope.openCover.MasterDocuments, function(att, key){
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
                angular.forEach($scope.openCover.MasterDocuments, function(att, key){
                    // if (att.is_active) {
                    //     totalFileSize += att.filesize / 1.00;
                    // }
                });

                item.formData.push({
                    ofrNo: $scope.openCover.FacOfrNo,
                    totalSizeCurrentAttachment: totalFileSize
                });
            };

            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                if (!$scope.openCover.MasterDocuments) $scope.openCover.MasterDocuments = [];
                if (response.Content) {
                    var content = response.Content.split('|');
                    var status = content[0];
                    var fileSize = content[2];
                    var datetime = content[3];

                    if (status == "1"){
                        $scope.openCover.MasterDocuments.push({
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
                if ($scope.openCover.FacOfrNo == null){
                    ofrNo = 0;
                }
                else {
                    ofrNo = $scope.openCover.FacOfrNo;
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
