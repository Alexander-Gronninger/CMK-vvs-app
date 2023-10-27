import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
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

function GF2MotionDot() {
  const { GF2Data } = useContext(GF2Context);

  const tunnelCss = "w-4 h-fit row-start-1 row-end-3";
  const dot = "bg-black rounded-full h-2 w-2 m-auto relative justify-self-end";

  const values = Array.from({ length: GF2Data.length - 1 }, (_, index) => ({
    x: index + 1,
    y: Number(calcAirspeed2(index, GF2Data)),
  }));

  const minY = 0; // minimum vertical value
  const maxY = 16; // maximum vertical value
  const minYAdjust = 0; // Minimum Y position
  const maxYAdjust = 280; // Maximum Y position
  const containerHeight = 350; // Set the desired height of the container div

  const [position, setPosition] = useState([]);
  useEffect(() => {
    const positions = values.map((value) => {
      const y = ((value - minY) / (maxY - minY)) * containerHeight;
      let yAdjust =
        minYAdjust + ((maxYAdjust - minYAdjust) / containerHeight) * y;

      if (yAdjust < minYAdjust) {
        yAdjust = minYAdjust;
      }
      if (yAdjust > maxYAdjust) {
        yAdjust = maxYAdjust;
      }

      return -yAdjust;
    });
    setPosition(positions);
    /* useEffect wants values, but doing so results in an infinite loop */
    // eslint-disable-next-line
  }, [GF2Data, minY, maxY, minYAdjust, maxYAdjust, containerHeight]);

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

  console.log(dataset);
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

export default GF2MotionDot;
