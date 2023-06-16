import { useContext } from "react";
import TableRow2 from "../components/TableRow2";
import AssignmentContext from "../context/AssignmentContext";
import CalcAdjustedKVsize from "../functions/CalcAdjustedKVsize";
import CalcLargestAdjustedKVsize from "../functions/CalcLargestAdjustedKVsize";

const Table2 = () => {
  const { assignmentData } = useContext(AssignmentContext);

  const tableCss = "text-center border-[1px] border-black";

  /* Calculates new opening based on KV1 data */

  const adjustedKVsize = CalcAdjustedKVsize(assignmentData);
  const largestAdjustedKVsize = CalcLargestAdjustedKVsize(assignmentData);

  /* Assignment data has [0] being default data, whereas adjusted settings only contain KV data, so there is a difference of one */
  const KVsetting = (adjustedKVsize[1] / largestAdjustedKVsize) * 10;
  /* Calculating the airspeed */
  let airSpeed =
    (Number(assignmentData[2].KVvalue) /
      Number(assignmentData[0].desiredOpening)) *
    Number(assignmentData[2].KVsize);

  const oldAirSpeed = (airSpeed / assignmentData[2].KVsize) * KVsetting;

  let newOpening =
    (assignmentData[0].desiredMS / oldAirSpeed) *
    assignmentData[0].desiredOpening;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className={tableCss}> </th>
            <th className={tableCss}>Indst.</th>
            <th className={tableCss}>Lufthast.</th>
            <th className={tableCss}>Ny lufthast.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tableCss}></td>
            <td className={tableCss}>[1-10]</td>
            <td className={tableCss}>[m/s]</td>
            <td className={tableCss}>[m/s]</td>
          </tr>
          {/* The amount of inputs needs to be the amount of KVinputs in the assignmentData array. Those are the only ones that change */}
          {[...Array(assignmentData.length - 1)].map((_, index) => (
            <TableRow2
              key={"CreationInput" + (index + 1)}
              index={index}
              isLast={false}
              tableCss={tableCss}
              newOpening={newOpening}
            ></TableRow2>
          ))}
        </tbody>
      </table>
      <p>
        Hvis der ønskes større eller mindre lufthastighed justeres hovedspjældet
        til ønsket resultat
      </p>
      <p>Gl åbning på hovedspjæld: {assignmentData[0].desiredOpening}mm</p>
      <p>Ny beregnet åbning: {parseFloat(newOpening).toFixed(1)}mm</p>
    </>
  );
};

export default Table2;
