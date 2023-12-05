import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { useContext } from "react";
import GF2Context from "../context/GF2Context";
import GF2MainOpeningInput from "../components/GF2MainOpeningInput";
import GF2StudentKV from "../templates/GF2StudentKV";
import { calcAirspeed2 } from "../functions/GF2Calculations";
import GF2ScatterChart from "../components/GF2ScatterChart";
import { Link } from "react-router-dom";
import GF2ChartLines from "../components/GF2ChartLines";

const GF2Version = () => {
  const { GF2Data } = useContext(GF2Context);

  return (
    <>
      <>
        {/* Multiple versions development, same description on every page */}
        <SiteDescription />

        {/* H1 with some CSS rules applied */}
        <H1>
          Indstil kontrolventiler herunder (1-10 mm) indtil boldene ligger ud
          for hinanden.
        </H1>

        <div className="grid">
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
                {(
                  calcAirspeed2(GF2Data, index) * GF2Data[0].MainOpening
                ).toFixed(2)}
              </p>
            );
          })}

          {/* Graphical section showing how close the student is to getting all valves airspeed(NewQV2) to be equal */}
          <div className="grid gap-x-[20px] justify-around p-2 row-start-4 row-end-5 col-start-1 col-end-6 h-fit">
            {/* image which the dots are rendered on top of */}
            <img
              className="row-start-1 row-end-1 col-start-1 col-end-1 flex"
              src="../images/glasrør.png"
              alt=""
            />
            <div className="row-start-1 row-end-1 col-start-1 col-end-1 grid h-[75%] items-end w-full gap-4 grid-cols-5 grid-rows-[13fr,3fr]">
              {/* The component handling the dots, their positioning and animation */}
              <GF2ScatterChart />
              <GF2ChartLines />
            </div>
          </div>
        </div>

        {/* MainOpening, is a value between 0-1 */}
        <div className="flex">
          <GF2MainOpeningInput />
          <p className="w-fit mx-2 my-auto h-fit">
            Juster ventilatorydelse (5-100%) til lufthastigheden ligger så tæt
            på {GF2Data[0].DesiredAirspeed} [m/s] som muligt
          </p>
        </div>
        <Link
          className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2 text-center my-8"
          to="/GF2/Teacher"
        >
          Lærer side
        </Link>
      </>
    </>
  );
};

export default GF2Version;
