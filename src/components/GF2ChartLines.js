import CalcMaxYValue from "../functions/CalcMaxYValue";
import CalcChartData from "../functions/CalcChartData";
import GF2Context from "../context/GF2Context";
import { useContext } from "react";
/* import {
  calcAirspeed2,
  calcCalculatedAdjustedKV,
} from "../functions/GF2Calculations"; */

const GF2ChartLines = ({ chartHeight }) => {
  const { GF2Data } = useContext(GF2Context);

  /* the charts max Y value, CalcMaxYValue accepts data structure presented by CalcChartData */
  const maxYValue = CalcMaxYValue(CalcChartData());

  /*   const cheatData = GF2Data.map((item, index) => {
    if (item.hasOwnProperty("StudentKVOpening") && index !== 0) {
      return {
        ...item, */
  /* The reason for index - 1 is calcCalculatedAdjustedKV function slices the first object from the data array it works with */
  /*         StudentKVOpening: calcCalculatedAdjustedKV(GF2Data, index - 1),
      };
    }
    return item;
  }); */

  /*   const CheatAirspeeds = [...Array(GF2Data.length - 1)].map((_, index) => {
    return calcAirspeed2(cheatData, index) * GF2Data[0].MainOpening;
  }); */

  /* const percentage = CheatAirspeeds[0] / maxYValue; */

  /* Uncomment above and comment below to have dotted lines be dynamic, currently it's set to always indicated DesiredAirspeed */
  const percentage = GF2Data[0].DesiredAirspeed / maxYValue;

  const margin = percentage * chartHeight;
  console.log(chartHeight);
  console.log(percentage);
  console.log(margin);

  return (
    <div
      className={`row-start-1 row-end-2 h-100% w-full col-start-1 col-end-6 flex flex-col justify-end`}
      style={{ marginBottom: `${margin - 22}px` }}
    >
      <div className="border-b-[2px] w-full border-dotted border-black h-0"></div>
      <div className="border-b-[2px] w-full border-dotted border-black mt-12     h-0"></div>
    </div>
  );
};

export default GF2ChartLines;
