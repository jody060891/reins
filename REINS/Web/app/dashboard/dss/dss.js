angular.module('PKBL')
    .controller('DssCtrl', function ($scope, $http, $location, $timeout,
                                     HukCedantNlSyariahService, HukCedantNlService, HukCedantLfSyariahService,
                                     HukCedantLfService) {
        
        $scope.HukCedantNlSyariahTemplate = "";
        $scope.HukCedantNlTemplate = "";
        $scope.HukCedantLFSyariahTemplate = "";
        $scope.HukCedantLFTemplate = "";
        $scope.mainScope = $scope;
        $scope.initCount = 0;
        $scope.generalOccupation = {};
        $scope.keyword = {};

        $scope.listTahun = [];
        var today = new Date();
        for(var i = 2000; i<= today.getFullYear(); i++){
            $scope.listTahun.push(i);
        }

        $scope.listRowNumber = [10, 20, 25, 50, 100];

        //  Huk Cedant NL Syariah
        $scope.SearchQueryHukCedantNLSyariah = {
            page: 1,
            row_per_page: 10,
            sort_by: 'comp_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keywordHukCedantNLSyariah,
                fields: ['cedant', 'comp_name']
            }
        };


        $scope.FetchHukCedantNlSyariah = function(){
            $scope.SearchQueryHukCedantNLSyariah.search.keyword = $scope.keyword.keywordHukCedantNLSyariah;
            var jsonResult = HukCedantNlSyariahService.FetchAllWithPagination(
                {
                    tahun: $scope.keyword.keywordHukCedantNLSyariahTahun,
                    searchQuery:$scope.SearchQueryHukCedantNLSyariah }
                , function(){
                var data_huk = jsonResult.data.list;
                $scope.listHukCedantNlSyariahList = [];
                $scope.listHukCedantNlSyariahList = data_huk;
                $scope.SearchQueryHukCedantNLSyariah.total_data = jsonResult.data.totalData;
            });
        };

        $scope.FetchHukCedantNlSyariah();

        $scope.onChangeRowNumberHukCedantNLSyariah = function(){
            $scope.SearchQueryHukCedantNLSyariah.page= 1;
            $scope.FetchHukCedantNlSyariah();
        };


        $scope.onSearchHukCedantNLSyariah = function () {
            $scope.FetchHukCedantNlSyariah();
        };

        $scope.onPageChangedHukCedantNLSyariah = function (page) {
            $scope.SearchQueryHukCedantNLSyariah.page = page;
            $scope.FetchHukCedantNlSyariah();
        };

        $scope.onSortHukCedantNLSyariah = function (sortField) {
            if ($scope.SearchQueryHukCedantNLSyariah.sort_by == sortField)
                $scope.SearchQueryHukCedantNLSyariah.is_sort_asc = !$scope.SearchQueryHukCedantNLSyariah.is_sort_asc;
            else
                $scope.SearchQueryHukCedantNLSyariah.is_sort_asc = true;
            $scope.SearchQueryHukCedantNLSyariah.sort_by = sortField;
            $scope.FetchHukCedantNlSyariah();
        };

        $scope.onKeyPressHukCedantNLSyariah = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearchHukCedantNLSyariah();
            }
            //$scope.FetchHukCedantNlSyariah();
        };

        $scope.onFetchHukCedantNlSyariah = function(){
            if ($scope.HukCedantNlSyariahTemplate.length <= 0){
                var url = "app/dashboard/dss/dss-template/huk-cedant-nl-syariah.html";
                $http.get(url).then(function(result) {
                    var template = result.data;
                    $scope.HukCedantNlSyariahTemplate = template;
                });
            }

            $timeout(function(){$scope.FetchHukCedantNlSyariah()}, 100);

        };

        // End of Huk Cedant NL Syariah

        //  Huk Cedant NL
        $scope.SearchQueryHukCedantNL = {
            page: 1,
            row_per_page: 10,
            sort_by: 'comp_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keywordHukCedantNL,
                fields: ['cedant', 'comp_name']
            }
        };


        $scope.FetchHukCedantNl = function(){
            $scope.SearchQueryHukCedantNL.search.keyword = $scope.keyword.keywordHukCedantNL;
            var jsonResult = HukCedantNlService.FetchAllWithPagination(
                {
                    tahun: $scope.keyword.keywordHukCedantNLTahun,
                    searchQuery:$scope.SearchQueryHukCedantNL }
                , function(){
                    var data_huk = jsonResult.data.list;
                    $scope.listHukCedantNlList = [];
                    $scope.listHukCedantNlList = data_huk;
                    $scope.SearchQueryHukCedantNL.total_data = jsonResult.data.totalData;

                });
        };


        $scope.onSearchHukCedantNL = function () {
            $scope.FetchHukCedantNl();
        };

        $scope.onChangeRowNumberHukCedantNL = function(){
            $scope.SearchQueryHukCedantNL.page= 1;
            $scope.FetchHukCedantNl();
        };

        $scope.onPageChangedHukCedantNL = function (page) {
            $scope.SearchQueryHukCedantNL.page = page;
            $scope.FetchHukCedantNl();
        };

        $scope.onSortHukCedantNL = function (sortField) {
            if ($scope.SearchQueryHukCedantNL.sort_by == sortField)
                $scope.SearchQueryHukCedantNL.is_sort_asc = !$scope.SearchQueryHukCedantNL.is_sort_asc;
            else
                $scope.SearchQueryHukCedantNL.is_sort_asc = true;
            $scope.SearchQueryHukCedantNL.sort_by = sortField;
            $scope.FetchHukCedantNl();
        };

        $scope.onKeyPressHukCedantNL = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearchHukCedantNL();
            }
        };

        $scope.onFetchHukCedantNl = function(){
            if ($scope.HukCedantNlTemplate.length <= 0){
                var url = "app/dashboard/dss/dss-template/huk-cedant-nl.html";
                $http.get(url).then(function(result) {
                    var template = result.data;
                    $scope.HukCedantNlTemplate = template;
                });
            }

            $timeout(function(){$scope.FetchHukCedantNl()}, 100);

        };

        // End of Huk Cedant NL

        //  Huk Cedant LF Syariah
        $scope.SearchQueryHukCedantLFSyariah = {
            page: 1,
            row_per_page: 10,
            sort_by: 'comp_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keywordHukCedantLFSyariah,
                fields: ['cedant', 'comp_name']
            }
        };


        $scope.FetchHukCedantLFSyariah = function(){
            $scope.SearchQueryHukCedantLFSyariah.search.keyword = $scope.keyword.keywordHukCedantLFSyariah;
            var jsonResult = HukCedantLfSyariahService.FetchAllWithPagination(
                {
                    tahun: $scope.keyword.keywordHukCedantLFSyariahTahun,
                    searchQuery:$scope.SearchQueryHukCedantLFSyariah }
                , function(){
                    var data_huk = jsonResult.data.list;
                    $scope.listHukCedantLFSyariahList = [];
                    $scope.listHukCedantLFSyariahList = data_huk;
                    $scope.SearchQueryHukCedantLFSyariah.total_data = jsonResult.data.totalData;
                });
        };

        $scope.FetchHukCedantLFSyariah();


        $scope.onSearchHukCedantLFSyariah = function () {
            $scope.FetchHukCedantLFSyariah();
        };

        $scope.onChangeRowNumberHukCedantLFSyariah = function(){
            $scope.SearchQueryHukCedantLFSyariah.page= 1;
            $scope.FetchHukCedantLFSyariah();
        };

        $scope.onPageChangedHukCedantLFSyariah = function (page) {
            $scope.SearchQueryHukCedantLFSyariah.page = page;
            $scope.FetchHukCedantLFSyariah();
        };

        $scope.onSortHukCedantLFSyariah = function (sortField) {
            if ($scope.SearchQueryHukCedantLFSyariah.sort_by == sortField)
                $scope.SearchQueryHukCedantLFSyariah.is_sort_asc = !$scope.SearchQueryHukCedantLFSyariah.is_sort_asc;
            else
                $scope.SearchQueryHukCedantLFSyariah.is_sort_asc = true;
            $scope.SearchQueryHukCedantLFSyariah.sort_by = sortField;
            $scope.FetchHukCedantLFSyariah();
        };

        $scope.onKeyPressHukCedantLFSyariah = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearchHukCedantLFSyariah();
            }
            //$scope.FetchHukCedantLFSyariah();
        };

        $scope.onFetchHukCedantLFSyariah = function(){
            if ($scope.HukCedantLFSyariahTemplate.length <= 0){
                var url = "app/dashboard/dss/dss-template/huk-cedant-lf-syariah.html";
                $http.get(url).then(function(result) {
                    var template = result.data;
                    $scope.HukCedantLFSyariahTemplate = template;
                });
            }

            $timeout(function(){$scope.FetchHukCedantLFSyariah()}, 100);

        };

        // End of Huk Cedant LF Syariah

        //  Huk Cedant LF
        $scope.SearchQueryHukCedantLF = {
            page: 1,
            row_per_page: 10,
            sort_by: 'comp_name',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keywordHukCedantLF,
                fields: ['cedant', 'comp_name']
            }
        };


        $scope.FetchHukCedantLF = function(){
            $scope.SearchQueryHukCedantLF.search.keyword = $scope.keyword.keywordHukCedantLF;
            var jsonResult = HukCedantLfService.FetchAllWithPagination(
                {
                    tahun: $scope.keyword.keywordHukCedantLFTahun,
                    searchQuery:$scope.SearchQueryHukCedantLF }
                , function(){
                    var data_huk = jsonResult.data.list;
                    $scope.listHukCedantLFList = [];
                    $scope.listHukCedantLFList = data_huk;
                    $scope.SearchQueryHukCedantLF.total_data = jsonResult.data.totalData;
                });
        };


        $scope.onSearchHukCedantLF = function () {
            $scope.FetchHukCedantLF();
        };

        $scope.onChangeRowNumberHukCedantLF = function(){
            $scope.SearchQueryHukCedantLF.page= 1;
            $scope.FetchHukCedantLF();
        };

        $scope.onPageChangedHukCedantLF = function (page) {
            $scope.SearchQueryHukCedantLFSyariah.page = page;
            $scope.FetchHukCedantLF();
        };

        $scope.onSortHukCedantLF = function (sortField) {
            if ($scope.SearchQueryHukCedantLF.sort_by == sortField)
                $scope.SearchQueryHukCedantLF.is_sort_asc = !$scope.SearchQueryHukCedantLF.is_sort_asc;
            else
                $scope.SearchQueryHukCedantLF.is_sort_asc = true;
            $scope.SearchQueryHukCedantLF.sort_by = sortField;
            $scope.FetchHukCedantLF();
        };

        $scope.onKeyPressHukCedantLF = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearchHukCedantLF();
            }
        };

        $scope.onFetchHukCedantLF = function(){
            if ($scope.HukCedantLFTemplate.length <= 0){
                var url = "app/dashboard/dss/dss-template/huk-cedant-lf.html";
                $http.get(url).then(function(result) {
                    var template = result.data;
                    $scope.HukCedantLFTemplate = template;
                });
            }

            $timeout(function(){$scope.FetchHukCedantLF()}, 100);

        };

        // End of Huk Cedant LF Syariah

        $scope.onFetchHukCedantNlSyariah();



    });