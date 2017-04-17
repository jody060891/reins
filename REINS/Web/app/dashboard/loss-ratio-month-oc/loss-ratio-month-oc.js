angular.module('PKBL')
    .controller('LossRatioMonthOcCtrl', function ($scope, $http, $location, cfpLoadingBar, OccupationService) {
        $scope.occupation = {Occup : ""};
        $scope.keyword = {};
        $scope.lineLabels = "['Series A', 'Series B']";
        $scope.dataGraph = {};
        $scope.dataGraph.dataLossRatio = {};

        $scope.thisYear = new Date().getFullYear();
        $scope.keyword.tahun = $scope.thisYear;

        // $scope.chartOptions = {
        //     dataSource: $scope.dataGraph.dataLossRatio,
        //     commonSeriesSettings: $scope.commonSeriesSettings,
        //     customizePoint: function(point){
        //         return $scope.customizePoint(point);
        //     },
        //     customizeLabel: function(point) {
        //         return $scope.customizeLabel(point);
        //     },
        //     "export": $scope.export,
        //     valueAxis: $scope.valueAxis,
        //     series: $scope.series,
        //     title: $scope.title,
        //     tooltip: $scope.tooltip,
        //     legend: $scope.legend
        // };

        $scope.FetchOccupByMonthGraphMorris = function(){
            cfpLoadingBar.start();
            var jsonResult = OccupationService.FetchOccupByMonthGraphMorris(
                {
                    occup: $scope.occupation.Occup,
                    tahun: ($scope.keyword.tahun != "")? $scope.keyword.tahun: 0
                }, function(){
                    var data_occupation = angular.copy(jsonResult.data);

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
                        legend: $scope.legend,
                        onPointHoverChanged: function (info) {
                            var hoveredPoint = info.target;
                            if (hoveredPoint.isHovered()) {
                                hoveredPoint.text = "a";
                            } else {
                            }
                        }
                    });

                    cfpLoadingBar.complete();


                    $scope.xaxis = 'yy';
                    $scope.yaxis = '["l", "t"]';
                });
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
                }
            );
        };

        if($location.search().occup != null){
            $scope.occupation.Occup = $location.search().occup;
            $location.path("/client_portal/lr_year_oc");
            $scope.FetchOneByOccup();
            $scope.FetchOccupByMonthGraphMorris();
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
            $scope.FetchOccupationGroupMonthWithPagination();
        };

        $scope.onPageChanged = function (page) {
            $scope.SearchQuery.page = page;
            $scope.FetchOccupationGroupMonthWithPagination();
        };

        $scope.onSort = function (sortField) {
            if ($scope.SearchQuery.sort_by == sortField)
                $scope.SearchQuery.is_sort_asc = !$scope.SearchQuery.is_sort_asc;
            else
                $scope.SearchQuery.is_sort_asc = true;
            $scope.SearchQuery.sort_by = sortField;
            $scope.FetchOccupationGroupMonthWithPagination();
        };

        $scope.onKeyPress = function ($event) {
            // if ($event.keyCode === 13) {
            //     $scope.onSearch();
            // }
            $scope.onSearch();
        };



        $scope.FetchOccupationGroupMonthWithPagination = function(){
            cfpLoadingBar.start();
            $scope.SearchQuery.search.keyword = $scope.keyword.keyword;
            var jsonResult = OccupationService.FetchOccupationGroupMonthWithPagination(
                {
                    searchQuery: $scope.SearchQuery,
                    tahun: $scope.keyword.tahun
                }, function(){
                    $scope.listOccupation = [];
                    $scope.listOccupation = jsonResult.data.list;
                    $scope.SearchQuery.total_data = jsonResult.data.totalData;
                }
            );
            cfpLoadingBar.complete();
        };

        $scope.FetchOccupationGroupMonthWithPagination();

        $scope.onSelectOccupation = function(occupationData){
            if(occupationData.Occup != $scope.occupation.Occup){
                $scope.occupation = occupationData;
                $scope.title.text = $scope.occupation.OccupName+" loss ratio";

                $scope.FetchOccupByMonthGraphMorris();
            }
            // $scope.chartOptions = {
            //     dataSource: $scope.dataGraph.dataLossRatio,
            //     commonSeriesSettings: $scope.commonSeriesSettings,
            //     customizePoint: function(point){
            //         return $scope.customizePoint(point);
            //     },
            //     customizeLabel: function(point) {
            //         return $scope.customizeLabel(point);
            //     },
            //     "export": $scope.export,
            //     valueAxis: $scope.valueAxis,
            //     series: $scope.series,
            //     title: $scope.title,
            //     tooltip: $scope.tooltip,
            //     legend: $scope.legend
            // };
            //
            // console.log($scope.chartOptions);
        };

        $scope.onClickTrend = function(){
            $scope.FetchOccupByMonthGraphMorris();

        };

        $scope.onClickLatestFiveYears = function(){
            $scope.keyword.awal_tahun = today.getFullYear()-5;
            $scope.keyword.akhir_tahun = today.getFullYear();
            $scope.FetchOccupByMonthGraphMorris();
        };

        $scope.onClickAllYear = function(){
            $scope.keyword.awal_tahun = null;
            $scope.keyword.akhir_tahun = null;
            $scope.FetchOccupByMonthGraphMorris();
        };

        $scope.onChangeYear = function(){
            cfpLoadingBar.start();
            $scope.FetchOccupationGroupMonthWithPagination();
            cfpLoadingBar.complete();
        };


        var highAverage = 100,
            lowAverage = 0;



        $scope.export = {
            enabled: true
        };

        $scope.title = {
            text: $scope.occupation.OccupName+" loss ratio",
            font: {
                size: 18,
                weight: 800
            }
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
            color: "#e7d19a",
            hoverMode: 'allArgumentPoints'
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
        };


    });