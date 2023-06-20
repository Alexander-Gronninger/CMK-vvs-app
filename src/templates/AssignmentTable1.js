import { useContext } from "react";
import AssignmentTableRow1 from "../components/AssignmentTableRow1";
import AssignmentContext from "../context/AssignmentContext";
/* import CalculateAverageAirspeed from "../functions/CalcAverageAirspeed"; */

const AssignmentTable1 = () => {
  const { assignmentData } = useContext(AssignmentContext);

  /* Calculating the average airspeed */

  /* const averageAirspeed = CalculateAverageAirspeed(assignmentData); */

  const tableCss = "text-center border-[1px] border-black";
  return (
    <table>
      <thead>
        <tr>
          <th className={tableCss}> </th>
          <th className={tableCss}>Indst.</th>
          <th className={tableCss}>Lufthastighed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={tableCss}></td>
          <td className={tableCss}>[1-10]</td>
          <td className={tableCss} colSpan="2">
            [m/s]
          </td>
        </tr>
        {/* The amount of inputs needs to be the amount of KVinputs in the assignmentData array. Those are the only ones that change */}
        {[...Array(assignmentData.length - 1)].map((_, index) => (
          <AssignmentTableRow1
            key={"CreationInput" + (index + 1)}
            index={index}
            isLast={false}
            tableCss={tableCss}
          ></AssignmentTableRow1>
        ))}
        {/* <tr>
          <td className={tableCss}>Gennemsnit</td>
          <td className={tableCss} colSpan="2">
            {(averageAirspeed.toFixed(1))}
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default AssignmentTable1;
