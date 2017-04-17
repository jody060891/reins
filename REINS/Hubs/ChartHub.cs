using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace HITS.Hubs
{
    public class ChartHub : Hub
    {
        // Create the instance of ChartDataUpdate
        private readonly ChartDataUpdate _ChartInstance;
        public ChartHub() : this(ChartDataUpdate.Instance) { }

        public ChartHub(ChartDataUpdate ChartInstance)
        {
            _ChartInstance = ChartInstance;
        }

        public void InitChartData()
        {
            //Show Chart initially when InitChartData called first time
            LineChart lineChart = new LineChart();
            PieChart pieChart = new PieChart();
            lineChart.SetLineChartData();
            pieChart.SetPieChartData();
            Clients.All.UpdateChart(lineChart, pieChart);

            //Call GetChartData to send Chart data every 5 seconds
            _ChartInstance.GetChartData();

        }

    }
}