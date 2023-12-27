import H1 from "../components/H1";
import GF2TeacherKVInput from "../components/GF2TeacherKVInput";
import GF2DesiredAirspeedInput from "../components/GF2DesiredAirspeedInput";
import QRLink from "../components/GF2TeacherQRLink";
import { Link } from "react-router-dom";
import GF2TeacherQVKVRelation from "../templates/GF2TeacherQVKVRelation";
import GF2TeacherMainOpening from "../templates/GF2TeacherMainOpening";
import GF2TeacherCheatSheet from "../templates/GF2TeacherCheatSheet";

////////////////////////////////////////////////////////////////
// Teacher page
//

const GF2Teacher = () => {
  return (
    <>
      <main>
        <p className="bg-black text-white text-center pb-2">
          Udfyldes af underviser
        </p>

        <H1>
          Her indstiller du forudsætningerne for opgaven. Når eleverne
          efterfølgende scanner QR-koden eller følger linket forneden, åbner de
          opgaven med dine indstillinger.
        </H1>
        <div className="grid gap-4">
          <GF2TeacherKVInput />
          <GF2TeacherQVKVRelation />
          <GF2TeacherMainOpening />
          <GF2DesiredAirspeedInput />
          <QRLink />
          <GF2TeacherCheatSheet />
          <Link
            className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2 text-center my-8"
            to="/"
          >
            Elev side
          </Link>
        </div>
      </main>
    </>
  );
};

export default GF2Teacher;
