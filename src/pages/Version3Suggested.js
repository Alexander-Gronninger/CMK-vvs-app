import { useContext } from "react";
import AutoCalculationTableV3 from "../templates/AutoCalculationTableV3";
import Version3Context from "../context/Version3Context";
import CalcAdjustedKVsize from "../functions/CalcAdjustedKVsize";
import CalcLargestAdjustedKVsize from "../functions/CalcLargestAdjustedKVsize";

const Version3Suggested = () => {
  const { version3Data } = useContext(Version3Context);

  const adjustedKVsize = CalcAdjustedKVsize(version3Data);
  const largestAdjustedKVsize = CalcLargestAdjustedKVsize(version3Data);

  /* Assignment data has [0] being default data, whereas adjusted settings only contain KV data, so there is a difference of one */
  const KVsetting = (adjustedKVsize[1] / largestAdjustedKVsize) * 10;

  /* Old and new airspeed gets used here, so calculations take place here and are propped down */
  const oldAirSpeed = (version3Data[2].KVvalue / 5) * KVsetting;

  const newOpening =
    (version3Data[0].desiredMS / oldAirSpeed) *
    (version3Data[0].desiredOpeningPercent * 10);

  const newAirSpeed =
    (oldAirSpeed / (version3Data[0].desiredOpeningPercent * 10)) * newOpening;

  return (
    <>
      <h2>Vejledende indstilling af KV'er</h2>
      <p>5) Indstil KV'erne som angivet nedenfor</p>
      <p>6) Mål igen LH på alle KV'er.</p>
      <p>Er LH ca. {oldAirSpeed.toFixed(1)} på alle KV?</p>
      <p>7) Indstil hovedspjæld til {(newOpening * 10).toFixed(0)}%</p>
      <p>Er LH ca. {newAirSpeed.toFixed(1)} på alle KV?</p>
      <AutoCalculationTableV3
        calculationData={version3Data}
        oldAirSpeed={oldAirSpeed}
        newAirSpeed={newAirSpeed}
        newOpening={newOpening}
      />
    </>
  );
};

export default Version3Suggested;
