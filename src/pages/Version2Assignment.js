import { useContext, useState } from "react";
import AssignmentTable1 from "../templates/AssignmentTable1";
import AssignmentContext from "../context/AssignmentContext";
import AssignmentTable2 from "../templates/AssignmentTable2";
import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";

const Version2Assignment = () => {
  const { assignmentData } = useContext(AssignmentContext);

  const [page2, setPage2] = useState(false);

  return (
    <>
      <>
        <SiteDescription />
        <H1>Elevside {page2 ? "2 - Vejledning" : "1 - Indstilling"}</H1>
        <div className="flex justify-around m-4">
          <button
            className="p-2 rounded-xl border-secondaryBG border-2"
            onClick={() => setPage2(false)}
          >
            Indstilling
          </button>
          <button
            className="p-2 rounded-xl border-secondaryBG border-2"
            onClick={() => setPage2(true)}
          >
            Vejledning
          </button>
        </div>
        <p className="my-2 text-center">
          {page2
            ? "Vejledende indstilling af kontrolventiler"
            : "Indstil kontrolventiler [KV] så de står på " +
              assignmentData[0].desiredOpening +
              "mm"}
        </p>
        {page2 ? <AssignmentTable2 /> : <AssignmentTable1 />}
      </>
    </>
  );
};

export default Version2Assignment;
