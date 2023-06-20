import CalculateAverageAirspeed from "./CalcAverageAirspeed";

const CalcAdjustedKVsize = (data) => {
  const averageAirspeed = CalculateAverageAirspeed(data);

  const adjustedKVsize = data
    .filter((item) => item.KVvalue !== undefined)
    .map((item) => {
      let airSpeed =
        (Number(item.KVvalue) /
          Number(
            (data[0]?.desiredOpening && data[0].desiredOpening) ||
              data[0].desiredOpeningPercent * 10
          )) *
        Number(item.KVsize);

      let adjustedKVsizeCalc =
        (Number(averageAirspeed) / airSpeed) * item.KVsize;
      return Number(adjustedKVsizeCalc);
    });

  return adjustedKVsize;
};

export default CalcAdjustedKVsize;
