import AutoCalculationTableRowV3 from "../components/AutoCalculationTableRowV3";

const AutoCalculationTableV3 = ({
  calculationData,
  oldAirSpeed,
  newAirSpeed,
  newOpening,
  paragraphCss,
}) => {
  const tableCss = "text-center border-[1px] border-black";
  const tableHeaderCss = " font-semibold mx-2";

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className={tableCss + tableHeaderCss}> </th>
            <th className={tableCss + tableHeaderCss}>Indst.</th>
            <th className={tableCss + tableHeaderCss}>Lufthast.</th>
            <th className={tableCss + tableHeaderCss}>Ny lufthast.</th>
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
      <p className={paragraphCss}>Vejledende indstilling af hovedspjæld</p>
      <p className={paragraphCss}>
        Ny beregnet åbning: {(newOpening * 10).toFixed(0)}%
      </p>
    </>
  );
};

export default AutoCalculationTableV3;
