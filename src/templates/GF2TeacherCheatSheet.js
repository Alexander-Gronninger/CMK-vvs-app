import { useContext } from "react";
import {
  calcCalculatedAdjustedKV,
  calcCalculatedFanPerformance,
} from "../functions/GF2Calculations";
import NumberFormatter from "../functions/NumberFormatter";
import GF2Context from "../context/GF2Context";

const GF2TeacherCheatSheet = () => {
  const { GF2Data } = useContext(GF2Context);

  return (
    <div className="w-full">
      <h2 className="font-semibold">Vejledende løsning</h2>

      <p>
        Beregnet ventilatorydelse:{" "}
        <NumberFormatter
          number={(calcCalculatedFanPerformance(GF2Data) * 100).toFixed(2)}
        />
        %
      </p>
      <p>Optimale KV indstillinger</p>
      <div className="flex justify-around">
        {[...Array(GF2Data.length - 1)].map((_, index) => {
          return (
            <p
              className=""
              id={"CalculatedAdjustedKV" + index}
              key={"CalculatedAdjustedKV" + index}
            >
              <NumberFormatter
                number={calcCalculatedAdjustedKV(GF2Data, index).toFixed(1)}
              />
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default GF2TeacherCheatSheet;
