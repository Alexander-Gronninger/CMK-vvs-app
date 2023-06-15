import { useContext } from "react";
import TableRow1 from "../components/TableRow1";
import AssignmentContext from "../context/AssignmentContext";

const Table = () => {
  const { assignmentData } = useContext(AssignmentContext);

  /* Calculating the average airspeed */

  const calculateAirspeedSum = (data) => {
    const sum = data.reduce((accumulator, currentValue, index) => {
      if (currentValue.KVvalue !== undefined && index > 0) {
        const result =
          (Number(currentValue.KVvalue) / Number(data[0].desiredOpening)) *
          Number(currentValue.KVsize);
        return accumulator + result;
      }
      return accumulator;
    }, 0);

    return sum;
  };

  const airspeedSum = calculateAirspeedSum(assignmentData);
  console.log(airspeedSum);
  let averageSpeed = airspeedSum / (assignmentData.length - 1);

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
          <td className={tableCss} colspan="2">
            [m/s]
          </td>
        </tr>
        {/* The amount of inputs needs to be the amount of KVinputs in the assignmentData array. Those are the only ones that change */}
        {[...Array(assignmentData.length - 1)].map((_, index) => (
          <TableRow1
            key={"CreationInput" + (index + 1)}
            index={index}
            isLast={false}
            tableCss={tableCss}
          ></TableRow1>
        ))}
        <tr>
          <td className={tableCss}>Gennemsnit</td>
          <td className={tableCss} colspan="2">
            {averageSpeed}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
