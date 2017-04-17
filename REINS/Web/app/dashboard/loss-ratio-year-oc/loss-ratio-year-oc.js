angular.module('PKBL')
    .controller('LossRatioYearOcCtrl', function ($scope, $http, $location, cfpLoadingBar, OccupationService) {
        $scope.occupation = {Occup : ""};
        $scope.keyword = {};
        $scope.lineLabels = "['Series A', 'Series B']";
        $scope.dataGraph = {};
        $scope.dataGraph.dataLossRatio = {};

        $scope.title = {
            text: $scope.occupation.OccupName+" loss ratio",
            font: {
                size: 18,
                weight: 800
            }
        };

        $scope.FetchOccupByYearGraphMorris = function(){
            cfpLoadingBar.start();
            var jsonResult = OccupationService.FetchOccupByYearGraphMorris(
                {
                    occup: $scope.occupation.Occup,
                    tahunAwal: ($scope.keyword.awal_tahun != "")? $scope.keyword.awal_tahun: 0,
                    tahunAkhir: ($scope.keyword.akhir_tahun != "")? $scope.keyword.akhir_tahun: 0
                }, function(){
                    var data_occupation = jsonResult.data;
                    if(!$scope.keyword.is_show_trend){
                        $scope.series = [{
                            valueField: 'l', color: '#0b62a4', name: 'Loss Ratio'
                        }];
                        data_occupation.forEach(function(d){
                            delete d.t;
                        });
                    }else{
                        $scope.series = [{
                            valueField: 'l', color: '#0b62a4', name: 'Loss Ratio'
                        }, {
                            valueField: 't', color: '#7a92a3', name: 'Trend'
                        }];
                    }
                    $scope.data = data_occupation;
                    $scope.dataGraph.dataLossRatio = $scope.data;



                    $('#dxchart').dxChart({
                        dataSource: $scope.dataGraph.dataLossRatio,
                        commonSeriesSettings: $scope.commonSeriesSettings,
                        customizePoint: function(point){
                            return $scope.customizePoint(point);
                        },
                        customizeLabel: function(point) {
                            return $scope.customizeLabel(point);
                        },
                        "export": $scope.export,
                        valueAxis: $scope.valueAxis,
                        series: $scope.series,
                        title: $scope.title,
                        tooltip: $scope.tooltip,
                        legend: $scope.legend
                    });
                    $scope.xaxis = 'yy';
                    $scope.yaxis = '["l", "t"]';
                });
            cfpLoadingBar.complete();
        };

        $scope.listTahun = [];
        var today = new Date();
        for(var i = 2000; i<= today.getFullYear(); i++){
            $scope.listTahun.push(i);
        }


        $scope.FetchOneByOccup = function(){
            var jsonResult = OccupationService.FetchOneByOccup(
                {
                    occup: $scope.occupation.Occup
                }, function(){
                    $scope.occupation = jsonResult.data;
                    $scope.title.text = $scope.occupation.OccupName+" loss ratio";
                }
            );
        };

        if($location.search().occup != null){
            $scope.occupation.Occup = $location.search().occup;

            $scope.FetchOneByOccup();
            $scope.FetchOccupByYearGraphMorris();
        }

        $scope.initCount = 0;
        $scope.generalOccupation = {};
        $scope.keyword = {};
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'Occup',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keyword,
                fields: ['Occup', 'OccupName']
            }
        };


        $scope.legendHover = function (index, options, content, row) {
            if(!$scope.keyword.is_show_trend){
                return "<b>"+row.yy+"</b><br> " +
                    "<div style='color:#0b62a4'>Loss Ratio : " + row.l+"%</div>";
            }else{
                return "<b>"+row.yy+"</b><br> " +
                    "<div style='color:#0b62a4'>Loss Ratio : " + row.l+"%</div>" +
                    "<div style='color:#7A92A3'>Trend : "+row.t+"</div> ";
            }
        };

        $scope.onSearch = function () {
            $scope.FetchOccupationGroupWithPagination();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
            $scope.FetchOccupationGroupWithPagination();
        };

        $scope.onSort = function (sortField) {
            if ($scope.SearchQuery.sort_by == sortField)
                $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
            else
                $scope.SearchQuery.is_sort_asc = true;
            $scope.SearchQuery.sort_by = sortField;
            $scope.FetchOccupationGroupWithPagination();
        };

        $scope.onKeyPress = function ($event) {
            if ($event.keyCode === 13) {
                $scope.onSearch();
            }
            // $scope.onSearch();
        };



        $scope.FetchOccupationGroupWithPagination = function(){
            cfpLoadingBar.start();
            $scope.SearchQuery.search.keyword = $scope.keyword.keyword;
            var jsonResult = OccupationService.FetchOccupationGroupWithPagination(
                {
                    searchQuery: $scope.SearchQuery
                }, function(){
                    $scope.listOccupation = [];
                    $scope.listOccupation = jsonResult.data.list;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                }
            );
            cfpLoadingBar.complete();
        };

        $scope.FetchOccupationGroupWithPagination();

        $scope.onSelectOccupation = function(occupationData){
            if(occupationData.Occup != $scope.occupation.Occup){
                $scope.occupation = occupationData;
                $scope.title.text = $scope.occupation.OccupName+" loss ratio";
                $scope.FetchOccupByYearGraphMorris();
            }

        };

        $scope.onClickTrend = function(){
            $scope.FetchOccupByYearGraphMorris();

        };

        $scope.onClickLatestFiveYears = function(){
            $scope.keyword.awal_tahun = today.getFullYear()-5;
            $scope.keyword.akhir_tahun = today.getFullYear();
            $scope.FetchOccupByYearGraphMorris();
        };

        $scope.onClickAllYear = function(){
            $scope.keyword.awal_tahun = null;
            $scope.keyword.akhir_tahun = null;
            $scope.FetchOccupByYearGraphMorris();
        };

        $scope.onSubmitChangeYearRange = function(){
            if($scope.keyword.awal_tahun != null && $scope.keyword.akhir_tahun != null){
                if($scope.keyword.awal_tahun <= $scope.keyword.akhir_tahun){
                    $scope.FetchOccupByYearGraphMorris();
                }else{
                    alert("Tahun awal tidak boleh lebih dari tahun akhir");
                }
            }else{
                $scope.FetchOccupByYearGraphMorris();
            }
        };

        var highAverage = 100,
            lowAverage = 0;



        $scope.export = {
            enabled: true
        };



        $scope.legend = {
            visible: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center'
        };

        $scope.tooltip = {
            enabled: true,
            customizeTooltip: function (point) {
                return {
                    text: point.valueText
                };
            }
        };

        $scope.valueAxis = {
            min: 0,
            maxValueMargin: 0.1,
            label: {
                customizeText: function() {
                    return this.valueText + "%";
                }
            },
            constantLines: [{
                label: {
                    text: "High Loss Ratio (>"+highAverage+"%)"
                },
                width: 2,
                value: highAverage,
                color: "#ff7c7c",
                dashStyle: "dash"
            }]
        };

        $scope.commonSeriesSettings = {
            argumentField: "yy",
            valueField: "temperature",
            type: "spline",
            color: "#e7d19a"
        };

        $scope.customizePoint = function(point){
            if(point.value >= highAverage) {
                var tempValue = highAverage;
                return { maxLabelCount: tempValue,  color: "#ff7c7c", hoverStyle: { color: "#ff7c7c" } };
            }
        };

        $scope.customizeLabel = function(point){
            if (point.value >= highAverage) {
                return {
                    visible: true,
                    backgroundColor: "#ff7c7c",
                    customizeText: function () {
                        return point.value + "%";
                    }
                };
            }
        }
    });