import { useContext } from "react";
import { calcAirspeed2 } from "./GF2Calculations";
import GF2Context from "../context/GF2Context";

const CalcChartData = () => {
  const { GF2Data } = useContext(GF2Context);
  const maxValue = 25; // Set your desired maximum value

  const values = Array.from({ length: GF2Data?.length - 1 }, (_, index) => {
    const calculatedValue =
      calcAirspeed2(GF2Data, index) * GF2Data[0].MainOpening;
    const y = Math.min(calculatedValue, maxValue); // Ensure y doesn't exceed the maximum value
    return {
      x: index + 1,
      y: Number(y),
    };
  });

  return values;
};

export default CalcChartData;
