angular.module('PKBL')
    .controller('LossRatioYearCtrl', function ($scope, $http, $location, OccupationService) {
        $scope.initCount = 0;
        $scope.generalOccupation = {};
        $scope.keyword = {};
        $scope.SearchQuery = {
            page: 1,
            row_per_page: 10,
            sort_by: 'occup',
            is_sort_asc: true,
            total_data: 0,
            search: {
                keyword: $scope.keyword.keyword,
                fields: ['occup', 'occup_name']
            }
        };

        var highAverage = 100;


        $scope.legendHover = function (index, options, content, row) {

            return "<b>"+row.yy+"</b><br> " +
                "<div style='color:#0b62a4'>Loss Ratio : " + row.l+"%</div>";
        };


        $scope.FetchByYearGraphMorris = function(){
            var jsonResult = OccupationService.FetchByYearGraphMorris(
                {
                    year: 2016
                }, function(){
                    $scope.data = jsonResult.data;
                    $('#dxchart').dxChart({
                        dataSource: $scope.data,
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
                    $scope.xaxis = 'yy';
                    $scope.yaxis = '["l"]';

                });
        };
        $scope.FetchByYearGraphMorris();



        $scope.export = {
            enabled: true
        };

        $scope.series = [{
            valueField: 'l', color: '#0b62a4', name: 'Loss Ratio'
        }];

        $scope.title = {
            text: "Loss Ratio by Year",
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