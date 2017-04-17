angular.module('HITS')
    .controller('PrintIncidentPageCtrl', function($scope, $modal, $location, $q, $window, $document, $routeParams, $timeout, FileService, LoadingScreenService, ToastMessageService, IncidentPrintService){

        $scope.incidentPrint = {};
        $scope.incidentPrint.imageUrl = "";
        $scope.isShowBtnPrint = true;
        var paramIncidentId = $location.search().incident_id;

        //$scope.incidentPrint.imageUrl = "/File/DownloadPdf?name=" + encodeURIComponent(result.Data);//"/temp/pdf/" + result.Data;

        $scope.downloadImage = function(){
            LoadingScreenService.showLoading();
            var jsonResult = IncidentPrintService.Print(
                {
                    incidentId: paramIncidentId //$scope.incident.incident_id
                },
                function(){
                    var result = jsonResult.data;
                    if (result.IsSuccess){
                        //$window.location.assign("/File/DownloadPdf?name=" + encodeURIComponent(result.Data));
                        var imagePath = "/File/DownloadPdf?name=" + encodeURIComponent(result.Data);//"/temp/pdf/" + result.Data;
                        $scope.incidentPrint.imageUrl = imagePath;
                        //$scope.printImage(imagePath);
                    }
                    else {
                        ToastMessageService.removeAlerts();
                        ToastMessageService.addAlerts("danger", "Print incident failed. Error : " + result.Message);
                    }
                    LoadingScreenService.hideLoading();
                });
        };

        $scope.onPrint = function() {
            //$scope.isShowBtnPrint = false;
            $timeout(function(){$window.print();}, 500);
            //var printWindow = $window.open('', '','height=600,width=800');
            //printWindow.document.write('<html><head><title>Print Window</title>');
            //printWindow.document.write('</head><body><div style="overflow-y: auto;">aaa<br /><img src=\'');
            //printWindow.document.write(imageUrl);
            //printWindow.document.write('\' /></div></body></html>');
            //printWindow.document.close();
            //
            //$timeout(function(){
            //    printWindow.print();
            //    //$timeout(function() {
            //    //    printWindow.close();
            //    //}, 100);
            //}, 1000);
        };

        $scope.onImgMouseOver = function(){
            $scope.isShowBtnPrint = true;
        };

        $scope.downloadImage();
    });