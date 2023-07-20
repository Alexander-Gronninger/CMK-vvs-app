import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { useContext } from "react";
import GF2StudentKVValueInput from "../components/GF2StudentKVValueInput";
import GF2Context from "../context/GF2Context";
import GF2TeacherTable from "../templates/GF2TeacherTable";
import CalcNewQV2 from "../functions/CalcNewQV2";
import GF2MotionDot from "../components/GF2MotionDot";
import ValveRotation from "../components/ValveRotation";
import { Link } from "react-router-dom";

const GF2Version = () => {
  const { GF2Data } = useContext(GF2Context);

  /* Css rules used by this components <th> elements, GF2KVValueInput(child component) and GF2TeacherTable(child component) <th> and <td> elements */
  const tableCss =
    "text-center border-[1px] border-black m-2 font-normal max-w-[50px]";

  return (
    <>
      <>
        {/* Multiple versions development, same description on every page */}
        <SiteDescription />

        {/* H1 with some CSS rules applied */}
        <H1>
          Indstil ventiler [1-10 mm] så boldene
          <br /> ligger mellem de to stiplede linjer
        </H1>

        <table>
          <thead>
            <tr>
              <th className={tableCss}>
                <label htmlFor="KV1" className="m-2">
                  KV1
                </label>
              </th>
              <th className={tableCss}>
                <label htmlFor="KV2" className="m-2">
                  KV2
                </label>
              </th>
              <th className={tableCss}>
                <label htmlFor="KV3" className="m-2">
                  KV3
                </label>
              </th>
              <th className={tableCss}>
                <label htmlFor="KV4" className="m-2">
                  KV4
                </label>
              </th>
              <th className={tableCss}>
                <label htmlFor="KV5" className="m-2">
                  KV5
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* GF2Data has 1 object with standard values, the rest are valve objects, so its length-1 === amount of valves */}
              {[...Array(GF2Data.length - 1)].map((_, index) => {
                return (
                  /* This component has an input, and all the code needed to handle it, it handles student KVValue */
                  <GF2StudentKVValueInput
                    tableCss={tableCss}
                    index={index}
                    key={"KV" + index}
                    id="KV"
                  />
                );
              })}
            </tr>
          </tbody>
        </table>

        {/* Graphical section showing how close the student is to getting all valves airspeed(NewQV2) to be equal */}
        <div className="grid gap-x-[20px] justify-around p-2">
          {/* image which the dots are rendered on top of */}
          <img
            className="row-start-1 row-end-1 col-start-1 col-end-1 flex max-w-[200px]"
            src="../images/glasrør.png"
            alt=""
          />
          <div className="row-start-1 row-end-1 col-start-1 col-end-1 grid h-[150px] items-end w-full gap-6">
            {/* The component handling the dots, their positioning and animation */}
            <GF2MotionDot />
            {/* The range students are meant to get the dots within */}
            <div className="row-start-1 row-end-2 h-full w-full col-start-1 col-end-6 flex flex-col">
              <div className="border-b-[2px] w-full border-dotted border-black mt-10 h-0"></div>
              <div className="border-b-[2px] w-full border-dotted border-black mt-10 h-0"></div>
            </div>
          </div>
        </div>

        {/* MainOpening, is a value between 0-1 */}
        <p className="m-auto w-fit my-4 ">
          Hovedspæld {GF2Data[0].MainOpening * 100}%
        </p>

        {/* Table showing the calculated airspeed based on student KV input and other data */}
        <table className="my-4">
          <thead>
            <tr>
              <th className={tableCss + " font-semibold"} colSpan="5">
                Beregnet Qv
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {/* NewQV2: (NewQV * CalcQVSumTimesMainOpening) / NewQVSum */}
              {[...Array(GF2Data.length - 1)].map((_, index) => {
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
        </div>

        {/* This template has all the stuff for teachers to enter */}
        <GF2TeacherTable tableCss={tableCss} />
        <div className="h-[100px]"></div>
        <ValveRotation />
        <div className="h-[1000px]"></div>
      </>
    </>
  );
};

export default GF2Version;
