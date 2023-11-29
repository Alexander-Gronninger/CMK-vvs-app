import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { useContext } from "react";
import GF2Context from "../context/GF2Context";
import GF2TeacherKVInput from "../functions/GF2TeacherKVInput";
import GF2QVKVRelationInput from "../components/GF2QVKVRelationInput";
import GF2MainOpeningInput from "../components/GF2MainOpeningInput";
import GF2DesiredAirspeedInput from "../components/GF2DesiredAirspeedInput";
import QRLink from "../components/GF2TeacherQRLink";
import { Link } from "react-router-dom";
import {
  calcCalculatedAdjustedKV,
  calcCalculatedFanPerformance,
} from "../functions/GF2Calculations";

const GF2Teacher = () => {
  const { GF2Data } = useContext(GF2Context);

  return (
    <>
      <>
        {/* Multiple versions development, same description on every page */}
        <SiteDescription />
        <p className="bg-black text-white text-center pb-2">
          Udfyldes af underviser
        </p>

        {/* H1 with some CSS rules applied */}
        <H1>
          Her indstiller du forudsætningerne for opgaven. Når eleverne
          efterfølgende scanner QR-koden eller følger linket forneden, åbner de
          opgaven med dine indstillinger.
        </H1>
        <div className="grid gap-4">
          <div className="flex">
            <p className="max-w-[65%]">
              1. Indstil kontrolventilerne (KV), så de alle har samme værdi
              (1-10)
            </p>
            <GF2TeacherKVInput />
          </div>
          <div className="grid gap-2 w-full">
            <p className="col-start-1 col-end-6">
              2. Indstil forholdet mellem lufthastigheden Qv [m/s] og
              kontrolventilåbningen [mm] for de enkelte KV’er. Jo højere tal, jo
              hurtigere lufthastighed (1-5).
            </p>
            {[...Array(GF2Data.length - 1)].map((_, index) => {
              return (
                <GF2QVKVRelationInput
                  index={index}
                  key={"QVKVRelation" + index}
                  id={"QVKVRelation" + index}
                />
              );
            })}
          </div>
          <div className="flex gap-4 w-full">
            <p className="max-w-70% my-auto">
              3. Indstil ventilatorydelse (5-100%)
            </p>
            <GF2MainOpeningInput />
          </div>
          <div className="flex gap-4 w-full">
            <p className="my-auto">
              4. Indstil den ønskede lufthastighed (5-25 m/s)
              <GF2DesiredAirspeedInput />
            </p>
          </div>
          <QRLink />
          <div className="w-full">
            <p>Facit</p>
            <p>{(calcCalculatedFanPerformance(GF2Data) * 100).toFixed(2)}%</p>
            <div className="flex justify-around">
              {[...Array(GF2Data.length - 1)].map((_, index) => {
                return (
                  <p
                    className=""
                    id={"CalculatedAdjustedKV" + index}
                    key={"CalculatedAdjustedKV" + index}
                  >
                    {calcCalculatedAdjustedKV(index, GF2Data).toFixed(1)}
                  </p>
                );
              })}
            </div>
          </div>
          <Link
            className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2 text-center my-8"
            to="/GF2"
          >
            Elev side
          </Link>
        </div>
      </>
    </>
  );
};

export default GF2Teacher;
