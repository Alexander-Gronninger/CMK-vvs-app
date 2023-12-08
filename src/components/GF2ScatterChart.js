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

function GF2ScatterChart() {
  const { GF2Data } = useContext(GF2Context);

  /* Function for setting padding between screen widths of 320-375, based on roughly looking at what padding is needed to center the dots */
  /* function calculatePadding(screenWidth) {
    const minWidth = 320;
    const maxWidth = 375;
    const minValue = 0;
    const maxValue = 23;

    if (screenWidth <= minWidth) {
      return minValue;
    }

    if (screenWidth >= maxWidth) {
      return maxValue;
    }

    // Calculate the interpolation factor
    const factor = (screenWidth - minWidth) / (maxWidth - minWidth);

    // Interpolate between minValue and maxValue
    const interpolatedValue = minValue + factor * (maxValue - minValue);

    return interpolatedValue;
  } */

  /* let screenWidth = window.innerWidth;
  let padding = calculatePadding(screenWidth); */

  /* Chart specific  */

  const chartData = CalcChartData(GF2Data);

  const refTest = useRef(null);

  /* Variable for dynamic max y of chart, uncomment and put highestY as the max in chart options.scales.y.max */
  /* const highestY = findHighestYValue(values); */

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
      },
    },
  };

  /* console.log(refTest?.current); */
  return (
    <>
      <div className="chart-container relative w-full h-[75%] row-start-1 row-end-3 col-start-1 col-end-6 px-2">
        <Scatter ref={refTest} data={dataset} options={chartOptions} />
      </div>
    </>
  );
}

export default GF2ScatterChart;
