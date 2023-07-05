/* Sum of all QVs in provided array, times the main opening */

import { useContext } from "react";
import GF2Context from "../context/GF2Context";

const CalcQVSumTimesMainOpening = (data) => {
  const { GF2Data } = useContext(GF2Context);
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].QV) {
      sum += data[i].QV;
    }
  }

  return sum * GF2Data[0].MainOpening;
};

export default CalcQVSumTimesMainOpening;
