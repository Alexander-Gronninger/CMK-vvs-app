/* This table is for student view 2 */

import CalcLargestAdjustedKVsize from "../functions/CalcLargestAdjustedKVsize";
import CalcAdjustedKVsize from "../functions/CalcAdjustedKVsize";

const AutoCalculationTableRowV3 = ({
  tableCss,
  index,
  calculationData,
  oldAirSpeed,
  newAirSpeed,
}) => {
  const adjustedKVsize = CalcAdjustedKVsize(calculationData);
  const largestAdjustedKVsize = CalcLargestAdjustedKVsize(calculationData);

  const KVsetting = (adjustedKVsize[index] / largestAdjustedKVsize) * 10;

  return (
    <tr>
      <td className={tableCss + " w-[70px]"}>KV{index + 1}</td>
      <td className={tableCss}>{KVsetting.toFixed(1)}</td>
      <td className={tableCss}>{oldAirSpeed.toFixed(1)}</td>
      <td className={tableCss}>{newAirSpeed.toFixed(1)}</td>
    </tr>
  );
};

export default AutoCalculationTableRowV3;
