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

  const values = Array.from({ length: GF2Data.length - 1 }, (_, index) => ({
    x: index + 1,
    y: Number(calcAirspeed2(index, GF2Data)),
  }));

  const dataset = {
    datasets: [
      {
        label: "",
        data: values,
        backgroundColor: "#000000",
      },
    ],
  };

  const chartOptions = {
    aspectRatio: 1,
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
