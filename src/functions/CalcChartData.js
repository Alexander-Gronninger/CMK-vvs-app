import { useContext } from "react";
import { calcAirspeed2 } from "./GF2Calculations";
import GF2Context from "../context/GF2Context";

const CalcChartData = () => {
  const { GF2Data } = useContext(GF2Context);
  const values = Array.from({ length: GF2Data?.length - 1 }, (_, index) => ({
    x: index + 1,
    y: Number(calcAirspeed2(GF2Data, index) * GF2Data[0].MainOpening),
  }));

  return values;
};

export default CalcChartData;
