import CalcAdjustedKVsize from "./CalcAdjustedKVsize";

const CalcLargestAdjustedKVsize = (data) => {
  const adjustedKVsize = CalcAdjustedKVsize(data);

  return Math.max(...adjustedKVsize);
};

export default CalcLargestAdjustedKVsize;
