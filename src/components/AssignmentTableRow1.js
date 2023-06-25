/* This table is for student view 1 */

import { useContext } from "react";
import { useState } from "react";
import AssignmentContext from "../context/AssignmentContext";
import InputSelect from "../functions/InputSelect";

const AssignmentTableRow1 = ({ tableCss, index }) => {
  const { assignmentData, setAssignmentData } = useContext(AssignmentContext);

  /* Handling changing of the KV size, between 1-10 */
  const [tableInput, setTableInput] =
    useState(assignmentData[index + 1] && assignmentData[index + 1].KVsize) ||
    "";

  const handleTableInputChange = (e) => {
    const inputValue = parseInt(e.target.value);

    if (isNaN(inputValue) || inputValue < 1 || inputValue > 10) {
      return;
    }
    setTableInput(inputValue);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[index + 1]) {
        newData[index + 1].KVsize = Number(inputValue);
      }
      return newData;
    });
  };

  /* Calculating the airspeed */
  let airSpeed =
    (Number(assignmentData[index + 1].KVvalue) /
      Number(assignmentData[0].desiredOpening)) *
    Number(assignmentData[index + 1].KVsize);

  return (
    <tr>
      <td className={tableCss}>
        <label className="m-2" htmlFor={"TableRow1_" + (index + 1)}>
          KV{index + 1}
        </label>
      </td>
      <td className={tableCss}>
        <input
          type="number"
          id={"TableRow1_" + (index + 1)}
          className="max-w-content min-w-[10px] max-w-[50px] text-center bg-gray-200"
          value={tableInput}
          onClick={InputSelect}
          onChange={handleTableInputChange}
        />
      </td>
      <td className={tableCss} colSpan="2">
        {airSpeed.toFixed(1)}
      </td>
    </tr>
  );
};

export default AssignmentTableRow1;
