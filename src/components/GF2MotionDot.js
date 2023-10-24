import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GF2Context from "../context/GF2Context";
import CalcNewQV2 from "../functions/CalcNewQV2";

function GF2MotionDot() {
  const { GF2Data } = useContext(GF2Context);

  const tunnelCss = "w-4 h-fit row-start-1 row-end-3";
  const dot = "bg-black rounded-full h-2 w-2 m-auto relative justify-self-end";

  const values = Array.from({ length: GF2Data.length - 1 }, (_, index) =>
    CalcNewQV2(index)
  );

  const minY = 0; // minimum vertical value
  const maxY = 16; // maximum vertical value
  const minYAdjust = 0; // Minimum Y position
  const maxYAdjust = 140; // Maximum Y position
  const containerHeight = 150; // Set the desired height of the container div

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

  return (
    <>
      {values.map((_, index) => (
        /* console.log(CalcNewQV(index)),
          console.log(CalcNewQV2(index)), */
        <div
          key={"dot" + index}
          className={tunnelCss}
          style={{ gridColumnStart: index + 1 }}
        >
          <motion.div
            key={index}
            className={"numeric-div " + dot}
            initial={{ translateY: 0 }}
            animate={{ translateY: position[index] }}
            transition={{
              duration: 1,
              translateY: 10,
              delay: index * 0.1,
            }}
          ></motion.div>
        </div>
      ))}
    </>
  );
}

export default GF2MotionDot;
