import AutoCalculationTableRowV3 from "../components/AutoCalculationTableRowV3";

const AutoCalculationTableV3 = ({
  calculationData,
  oldAirSpeed,
  newAirSpeed,
  newOpening,
}) => {
  const tableCss = "text-center border-[1px] border-black";

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
          {[...Array(calculationData.length - 1)].map((_, index) => (
            <AutoCalculationTableRowV3
              key={"CreationInput" + (index + 1)}
              index={index}
              isLast={false}
              tableCss={tableCss}
              calculationData={calculationData}
              oldAirSpeed={oldAirSpeed}
              newAirSpeed={newAirSpeed}
              newOpening={newOpening}
            ></AutoCalculationTableRowV3>
          ))}
        </tbody>
      </table>
      <p>Vejledende indstilling af hovedspjæld</p>
      <p>Ny beregnet åbning: {(newOpening * 10).toFixed(0)}%</p>
    </>
  );
};

export default AutoCalculationTableV3;
