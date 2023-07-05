/* ((QV * MainOpening) / TeacherKVOpening) * StudentKVOpening */
/* Accepts a single param, index, to determine which of the "valves" is being calculated */

import { useContext } from "react";
import GF2Context from "../context/GF2Context";
import CalcQVTimesMainOpening from "./CalcQVTimesMainOpening";

const CalcNewQV = (index) => {
  const { GF2Data } = useContext(GF2Context);
  let sum =
    (CalcQVTimesMainOpening(GF2Data[index + 1]?.QV) /
      GF2Data[index + 1]?.TeacherKVOpening) *
    GF2Data[index + 1]?.StudentKVOpening;

  return sum;
};

export default CalcNewQV;
