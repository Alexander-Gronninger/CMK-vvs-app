/* This table is for student view 2 */

import { useContext } from "react";
import AssignmentContext from "../context/AssignmentContext";
import CalcLargestAdjustedKVsize from "../functions/CalcLargestAdjustedKVsize";
import CalcAdjustedKVsize from "../functions/CalcAdjustedKVsize";

const AssignmentTableRow2 = ({ tableCss, index, newOpening }) => {
  const { assignmentData } = useContext(AssignmentContext);

  /* getting data for print data calculation */

  const adjustedKVsize = CalcAdjustedKVsize(assignmentData);
  const largestAdjustedKVsize = CalcLargestAdjustedKVsize(assignmentData);
  /* Calculating the airspeed */
  let airSpeed =
    (Number(assignmentData[index + 1].KVvalue) /
      Number(assignmentData[0].desiredOpening)) *
    Number(assignmentData[index + 1].KVsize);

  /* calculating print data */

  const KVsetting = (adjustedKVsize[index] / largestAdjustedKVsize) * 10;
  const oldAirSpeed = (airSpeed / assignmentData[index + 1].KVsize) * KVsetting;
  const newAirSpeed =
    (oldAirSpeed / assignmentData[0].desiredOpening) * Number(newOpening);

  return (
    <tr>
      <td className={tableCss + " w-[100px]"}>KV{index + 1}</td>
      <td className={tableCss}>{parseFloat(KVsetting.toFixed(0))}</td>
      <td className={tableCss}>{parseFloat(oldAirSpeed.toFixed(1))}</td>
      <td className={tableCss}>{parseFloat(newAirSpeed.toFixed(1))}</td>
    </tr>
  );
};

export default AssignmentTableRow2;
