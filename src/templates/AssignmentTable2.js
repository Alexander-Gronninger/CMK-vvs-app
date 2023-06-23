import { useContext } from "react";
import AssignmentContext from "../context/AssignmentContext";
import CalcAdjustedKVsize from "../functions/CalcAdjustedKVsize";
import CalcLargestAdjustedKVsize from "../functions/CalcLargestAdjustedKVsize";
import AutoCalculationTableRowV2 from "../components/AutoCalculationTableRowV2";

const AssignmentTable2 = () => {
  const { assignmentData } = useContext(AssignmentContext);

  const tableCss = "text-center border-[1px] border-black m-2";

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
            <th className={tableCss}>
              <p className="w-[50px]"></p>
            </th>
            <th className={tableCss}>
              <p className="m-2 font-semibold">Indst.</p>
            </th>
            <th className={tableCss}>
              <p className="m-2 font-semibold">Lufthast.</p>
            </th>
            <th className={tableCss}>
              <p className="m-2 font-semibold">Ny lufthast.</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tableCss + " w-[30px]"}></td>
            <td className={tableCss}>[1-10]</td>
            <td className={tableCss}>[m/s]</td>
            <td className={tableCss}>[m/s]</td>
          </tr>
          {/* The amount of inputs needs to be the amount of KVinputs in the assignmentData array. Those are the only ones that change */}
          {[...Array(assignmentData.length - 1)].map((_, index) => (
            <AutoCalculationTableRowV2
              key={"CreationInput" + (index + 1)}
              index={index}
              isLast={false}
              tableCss={tableCss}
              newOpening={newOpening}
              calculationData={assignmentData}
            ></AutoCalculationTableRowV2>
          ))}
        </tbody>
      </table>
      <div className="max-w-[300px] m-4">
        <p className="my-2">
          Hvis der ønskes større eller mindre lufthastighed justeres
          hovedspjældet til ønsket resultat.
        </p>
        <p className="my-2">
          Gl åbning på hovedspjæld: {assignmentData[0].desiredOpening}mm
        </p>
        <p className="my-2">Ny beregnet åbning: {newOpening.toFixed(1)}mm</p>
      </div>
    </>
  );
};

export default AssignmentTable2;
