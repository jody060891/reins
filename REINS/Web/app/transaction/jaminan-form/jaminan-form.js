angular.module('PKBL')
    .controller('JaminanFormCtrl',
     function JaminanFormCtrl($rootScope, $scope, $resource, $window, $location, $modalInstance, ToastMessageService, FileUploader, pinjamanId, jaminanPinjaman) {
         $scope.pinjamanId = pinjamanId;
         $scope.jaminan = {};
         $scope.hashKey = jaminanPinjaman!=null? jaminanPinjaman.$$hashKey: null;
         $scope.jaminan = jaminanPinjaman!=null? angular.copy(jaminanPinjaman): { jaminan_id: 0, Attachments: []};

         $scope.validate = {};
         $scope.validate.button = true;



         if ($scope.jaminan.jenis_jaminan) {
             $scope.validate.jenis_jaminan = false;
         }
         if ($scope.jaminan.nama_pemilik) {
             $scope.validate.nama_pemilik = false;
         }

         $scope.isValid = function () {
             if ($scope.jaminan.jenis_jaminan) {
                 $scope.validate.jenis_jaminan = false;
             }else{
                 $scope.validate.jenis_jaminan = true;
             }
             if ($scope.jaminan.nama_pemilik) {
                 $scope.validate.nama_pemilik = false;
             }else{
                 $scope.validate.nama_pemilik = true;
             }

             if (!$scope.validate.jenis_jaminan && !$scope.validate.nama_pemilik) {
                 return true;
             } else {
                 return false;
             }
         };


         $scope.onSave = function () {
             $scope.validate.button = false;
             if ($scope.isValid()) {
                 $scope.validate.button = false;
                 $scope.jaminan.is_active = true;
                 $scope.jaminan.$$hashKey = $scope.hashKey != null? $scope.hashKey : $scope.jaminan.$$hashKey;
                 $modalInstance.close($scope.jaminan);
             }


         };



         $scope.fileSizeLimit = 2;
         $scope.totalFileSizeLimit = 8;
         var uploadErrorMessage = "";

         $scope.calculateTotalSize = function(){
             $scope.totalFileSize = 0;
             angular.forEach($scope.jaminan.Attachments, function(att, key){
                 if (att.is_active) {
                     $scope.totalFileSize += att.filesize / 1.00;
                 }
             });
             $scope.totalFileSize = $scope.totalFileSize / 1024.00 / 1024.00;
         };

         var uploader = $scope.uploader = new FileUploader({
             url: '/File/UploadJaminanAttachment',
             autoUpload: true,
             removeAfterUpload: true
         });

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
                 angular.forEach($scope.jaminan.Attachments, function(att, key){
                     if (att.is_active && att.filename == fileName){
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
             angular.forEach($scope.jaminan.Attachments, function(att, key){
                 if (att.is_active) {
                     totalFileSize += att.filesize / 1.00;
                 }
             });

             item.formData.push({
                 jaminanId: $scope.jaminan.jaminan_id,
                 totalSizeCurrentAttachment: totalFileSize
             });
         };


         uploader.onSuccessItem = function (fileItem, response, status, headers) {
             if (!$scope.jaminan.Attachments) $scope.jaminan.Attachments = [];
             if (response.Content) {
                 var content = response.Content.split('|');
                 var status = content[0];
                 var fileSize = content[2];

                 if (status == "1"){
                     $scope.jaminan.Attachments.push({
                         is_active: true,
                         filename: fileItem.file.name,
                         filesize: fileSize
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
             var jaminanId = 0;
             if ($scope.jaminan.jaminan_id == null){
                 jaminanId = 0;
             }
             else {
                 jaminanId = $scope.jaminan.jaminan_id;
             }
             $window.open("/File/DownloadJaminanAttachment?name=" + encodeURIComponent(att.filename) + "&jaminanId=" + jaminanId);

         };

         $scope.onDeleteAttachment = function (att){
             if (confirm('Are you sure you want to delete this attachment?')) {
                 att.is_active = false;
                 ToastMessageService.addAlerts('success', "File removed successfully");
                 $scope.calculateTotalSize();
             }
         };
     });