/* QV * main opening */
/* Accepts a single number(QV) */

import { useContext } from "react";
import GF2Context from "../context/GF2Context";

const CalcQVTimesMainOpening = (data) => {
  const { GF2Data } = useContext(GF2Context);
  let sum = data * GF2Data[0].MainOpening;

  return sum;
};

export default CalcQVTimesMainOpening;
