import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { useContext } from "react";
import GF2StudentKVValueInput from "../components/GF2StudentKVValueInput";
import GF2Context from "../context/GF2Context";
import GF2TeacherTable from "../templates/GF2TeacherTable";
import CalcNewQV2 from "../functions/CalcNewQV2";
import GF2MotionDot from "../functions/GF2MotionDot";

const GF2Version = () => {
  const { GF2Data } = useContext(GF2Context);

  /* Css rules used by this components <th> elements, GF2KVValueInput(child component) and GF2TeacherTable(child component) <th> and <td> elements */
  const tableCss =
    "text-center border-[1px] border-black m-2 font-normal max-w-[50px]";

  return (
    <>
      <>
        <SiteDescription />
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
              {[...Array(GF2Data.length - 1)].map((_, index) => {
                return (
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
        <div className="grid gap-x-[20px] justify-around">
          {/* image which the dots are rendered on top of */}
          <img
            className="row-start-1 row-end-1 col-start-1 col-end-1 flex"
            src="../images/Injustring-m-grafik.png"
            alt=""
          />
          <div className="row-start-1 row-end-1 col-start-1 col-end-1 grid mt-6 h-[140px] gap-x-2 items-end">
            <GF2MotionDot />
            <div className="row-start-1 row-end-2 h-full w-full col-start-1 col-end-6">
              <div className="border-b-[2px] w-full border-dotted border-black mt-9"></div>
              <div className="border-b-[2px] w-full border-dotted border-black mt-9"></div>
            </div>
          </div>
        </div>
        <p className="m-auto w-fit my-4 ">
          Hovedspæld {GF2Data[0].MainOpening * 100}%
        </p>
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
              {/* New QV2: (NewQV / CalcQVSumTimesMainOpening) * NewQVSum */}
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

        <GF2TeacherTable tableCss={tableCss} />
      </>
    </>
  );
};

export default GF2Version;