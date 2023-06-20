/* This table is for student view 2 */

import CalcLargestAdjustedKVsize from "../functions/CalcLargestAdjustedKVsize";
import CalcAdjustedKVsize from "../functions/CalcAdjustedKVsize";

const AutoCalculationTableRow = ({
  tableCss,
  index,
  newOpening,
  calculationData,
}) => {
  /* getting data for print data calculation */

  const adjustedKVsize = CalcAdjustedKVsize(calculationData);
  const largestAdjustedKVsize = CalcLargestAdjustedKVsize(calculationData);
  /* Calculating the airspeed */
  let airSpeed =
    (Number(calculationData[index + 1].KVvalue) /
      Number(calculationData[0].desiredOpening)) *
    Number(calculationData[index + 1].KVsize);

  /* calculating print data */

  const KVsetting = (adjustedKVsize[index] / largestAdjustedKVsize) * 10;
  const oldAirSpeed =
    (airSpeed / calculationData[index + 1].KVsize) * KVsetting;
  const newAirSpeed =
    (oldAirSpeed / calculationData[0].desiredOpening) * Number(newOpening);

  return (
    <tr>
      <td className={tableCss + " w-[100px]"}>KV{index + 1}</td>
      <td className={tableCss}>{KVsetting.toFixed(0)}</td>
      <td className={tableCss}>{oldAirSpeed.toFixed(1)}</td>
      <td className={tableCss}>{newAirSpeed.toFixed(1)}</td>
    </tr>
  );
};

export default AutoCalculationTableRow;
