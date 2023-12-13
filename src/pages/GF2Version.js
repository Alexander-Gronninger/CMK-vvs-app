import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { useContext } from "react";
import GF2Context from "../context/GF2Context";
import GF2MainOpeningInput from "../components/GF2MainOpeningInput";
import GF2StudentKV from "../components/GF2StudentKV";
import {
  calcAirspeed2,
  calcAirspeedDifferencePercentage,
} from "../functions/GF2Calculations";
import GF2ScatterChart from "../components/GF2ScatterChart";
/* import { Link } from "react-router-dom"; */
import GF2ChartLines from "../components/GF2ChartLines";
import NumberFormatter from "../functions/NumberFormatter";

const GF2Version = () => {
  const { GF2Data } = useContext(GF2Context);

  return (
    <>
      <>
        <main className="">
          {/* Multiple versions development, same description on every page */}
          <SiteDescription />

          {/* H1 with some CSS rules applied */}
          <H1>
            Indstil kontrolventiler herunder (1-10 mm) indtil boldene ligger ud
            for hinanden.
          </H1>

          <div className="grid max-w-[300px]">
            {/* GF2Data has 1 object with standard values, the rest are valve objects, so its length-1 === amount of valves */}
            {[...Array(GF2Data.length - 1)].map((_, index) => {
              return (
                <div
                  className={"row-start-1 row-end-2 h-fit w-fit flex flex-col"}
                  key={index}
                >
                  <GF2StudentKV index={index} />
                </div>
              );
            })}

            {/* Calculated airspeed */}
            <p className="col-start-1 col-end-6 text-center">
              Beregnet lufthastighed [m/s]
            </p>
            {[...Array(GF2Data.length - 1)].map((_, index) => {
              return (
                <p className="text-center" key={index}>
                  <NumberFormatter
                    number={(
                      calcAirspeed2(GF2Data, index) * GF2Data[0].MainOpening
                    ).toFixed(2)}
                  />
                </p>
              );
            })}

            <div className="grid gap-x-[20px] justify-around p-2 row-start-4 row-end-5 col-start-1 col-end-6 h-fit max-w-[300px]">
              <img
                className="row-start-1 row-end-3 col-start-1 col-end-6 flex px-2"
                src="../images/glasrør.png"
                alt=""
              />
              <GF2ChartLines />
              <GF2ScatterChart />
            </div>
          </div>

          {/* MainOpening, is a value between 0-1 */}
          <div className="flex max-w-[300px]">
            <GF2MainOpeningInput />
            <p className="w-fit mx-2 my-auto h-fit">
              Juster ventilatorydelse (5-100%) til lufthastigheden ligger så tæt
              på {GF2Data[0].DesiredAirspeed} [m/s] som muligt
            </p>
          </div>

          <div className="flex gap-2 ml-[56px] max-w-[300px]">
            <p>
              Du afviger{" "}
              <NumberFormatter
                number={calcAirspeedDifferencePercentage(GF2Data).toFixed(1)}
              />
              % fra den ønskede lufthastighed. Kan du gøre det endnu bedre?
            </p>
          </div>
          {/* <Link
            className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2 text-center my-8 max-w-[300px]"
            to="/Teacher"
          >
            Lærer side
          </Link> */}
        </main>
      </>
    </>
  );
};

export default GF2Version;
