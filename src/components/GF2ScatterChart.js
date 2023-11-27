import React, { useContext } from "react";
import GF2Context from "../context/GF2Context";
import { calcAirspeed2 } from "../functions/GF2Calculations";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function GF2ScatterChart() {
  const { GF2Data } = useContext(GF2Context);

  /* Code for implementing dynamic max to the chart, if desired - simply uncomment and set a variable to the result of this function as the maxy in the chart options */
  /*  function findHighestYValue(data) {
    if (!data || data.length === 0) {
      return null; // Return null for an empty array or invalid data.
    }

    let highestY = data[0].y; // Initialize with the first value.

    for (let i = 1; i < data.length; i++) {
      if (data[i].y > highestY) {
        highestY = data[i].y; // Update highestY if a higher value is found.
      }
    }

    return highestY;
  } */

  /* Function for setting padding between screen widths of 320-375, based on roughly looking at what padding is needed to center the dots */
  function calculatePadding(screenWidth) {
    const minWidth = 320;
    const maxWidth = 375;
    const minValue = 18;
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
  }

  let screenWidth = window.innerWidth;
  let padding = calculatePadding(screenWidth);

  /* Chart specific  */

  const values = Array.from({ length: GF2Data.length - 1 }, (_, index) => ({
    x: index + 1,
    y: Number(calcAirspeed2(index, GF2Data)),
  }));

  /* Variable for dynamic max y of chart, uncomment and put highestY as the max in chart options.scales.y.max */
  /* const highestY = findHighestYValue(values); */

  const dataset = {
    datasets: [
      {
        label: "",
        data: values,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00000050",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    layout: { padding: padding },
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
        max: 80,
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
      },
    },
  };

  return (
    <>
      <Scatter
        data={dataset}
        options={chartOptions}
        className="row-start-1 row-end-2 col-start-1 col-end-6"
      />
    </>
  );
}

export default GF2ScatterChart;
