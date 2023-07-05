/* sum of all NewQVSum ((QV * MainOpening) / TeacherKVOpening) * StudentKVOpening */

import { useContext } from "react";
import GF2Context from "../context/GF2Context";
import CalcNewQV2 from "./CalcNewQV2";

const CalcNewQV2Sum = () => {
  const { GF2Data } = useContext(GF2Context);

  let sum = 0;
  for (let index = 0; index < GF2Data.length - 1; index++) {
    let NewQV2 = CalcNewQV2(index);

    sum += NewQV2;
  }

  return sum;
};

export default CalcNewQV2Sum;
