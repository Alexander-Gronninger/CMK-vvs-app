/* sum of all NewQVSum ((QV * MainOpening) / TeacherKVOpening) * StudentKVOpening */

import { useContext } from "react";
import GF2Context from "../context/GF2Context";
import CalcNewQV from "./CalcNewQV";

const CalcNewQVSum = () => {
  const { GF2Data } = useContext(GF2Context);

  let sum = 0;
  for (let index = 0; index < GF2Data.length - 1; index++) {
    let NewQV = CalcNewQV(index);

    sum += NewQV;
  }

  return sum;
};

export default CalcNewQVSum;
