import React, { useContext, useRef } from "react";
import GF2Context from "../context/GF2Context";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import CalcMaxYValue from "../functions/CalcMaxYValue";
import CalcChartData from "../functions/CalcChartData";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

////////////////////////////////////////////////////////////////
// ScatterChart for visually displaying airspeed2
//

function GF2ScatterChart() {
  const { GF2Data } = useContext(GF2Context);

  /* CalcChartData takes GF2Data and returns an array of x and y positions used by the chart */
  const chartData = CalcChartData(GF2Data);
  const chartRef = useRef(null);

  /* Chart data / settings */
  const dataset = {
    datasets: [
      {
        label: "",
        data: chartData,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00000050",
      },
    ],
  };

  /* https://www.chartjs.org/docs/latest/ - documentation */
  const chartOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        enabled: false,
        labels: { boxWidth: 0 },
      },
      customCanvasBackgroundColor: {
        color: "#00000000",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: CalcMaxYValue(chartData),
        min: -2.5,
        display: false,
        grid: false,
      },
      x: {
        display: false,
        grid: false,
      },
    },
    elements: {
      point: {
        radius: 15,
        borderWidth: 4,
        hoverRadius: 15,
        hoverBorderWidth: 4,
      },
    },
  };

  return (
    <>
      <div className="chart-container relative w-full h-[75%] row-start-1 row-end-3 col-start-1 col-end-6 px-2">
        <Scatter ref={chartRef} data={dataset} options={chartOptions} />
      </div>
    </>
  );
}

export default GF2ScatterChart;
