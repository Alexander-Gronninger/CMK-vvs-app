import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { useContext } from "react";
import GF2Context from "../context/GF2Context"; /* 
import GF2TeacherTable from "../templates/GF2TeacherTable";
import CalcNewQV2 from "../functions/CalcNewQV2"; */
/* import { Link } from "react-router-dom"; */
import GF2MainOpeningInput from "../components/GF2MainOpeningInput";
import GF2StudentKV from "../templates/GF2StudentKV"; /* 
import CalcNewQV from "../functions/CalcNewQV"; */
import { calcAirspeed2 } from "../functions/GF2Calculations";
import GF2ScatterChart from "../components/GF2ScatterChart";
import { Link } from "react-router-dom";

const GF2Version = () => {
  const { GF2Data } = useContext(GF2Context);

  /* Css rules used by this components <th> elements, GF2KVValueInput(child component) and GF2TeacherTable(child component) <th> and <td> elements */
  const tableCss = "text-center";

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
                <GF2StudentKV tableCss={tableCss} index={index} />
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
                {calcAirspeed2(index, GF2Data)}
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
            <div className="row-start-1 row-end-1 col-start-1 col-end-1 grid h-[75%] items-end w-[95%] gap-4 grid-cols-5 grid-rows-[13fr,3fr] m-2">
              {/* The component handling the dots, their positioning and animation */}
              <GF2ScatterChart />
              {/* The range students are meant to get the dots within */}
              <div className="row-start-1 row-end-2 h-100% w-full col-start-1 col-end-6 flex flex-col justify-end mb-14">
                <div className="border-b-[2px] w-full border-dotted border-black mt-10 h-0"></div>
                <div className="border-b-[2px] w-full border-dotted border-black mt-8 h-0"></div>
              </div>
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

        {/* Table showing the calculated airspeed based on student KV input and other data */}
        {/*         <table className="my-4">
          <thead>
            <tr>
              <th className={tableCss + " font-semibold"} colSpan="5">
                Beregnet Qv
              </th>
            </tr>
          </thead>

          <tbody>
            <tr> */}
        {/* NewQV2: (NewQV * CalcQVSumTimesMainOpening) / NewQVSum */}
        {/*               {[...Array(GF2Data.length - 1)].map((_, index) => {
                return (
                  <td className={tableCss} key={"NewQV" + index}>
                    {CalcNewQV2(index).toFixed(2)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>

        <div className="m-auto my-2 w-fit h-fit p-2 border-secondaryBG border-2 rounded">
          <Link to="/GF2/export">QR / Link</Link>
        </div> */}

        {/* This template has all the stuff for teachers to enter */}
        {/*         <GF2TeacherTable tableCss={tableCss} /> */}
      </>
    </>
  );
};

export default GF2Version;
