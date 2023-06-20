import { useContext, useState } from "react";
import AssignmentTable1 from "../templates/AssignmentTable1";
import AssignmentContext from "../context/AssignmentContext";
import AssignmentTable2 from "../templates/AssignmentTable2";

const Assignment = () => {
  const { assignmentData } = useContext(AssignmentContext);

  const [page2, setPage2] = useState(false);

  return (
    <>
      <main>
        <div className="flex justify-around">
          <button className="" onClick={() => setPage2(false)}>
            Elevside 1
          </button>
          <button className="" onClick={() => setPage2(true)}>
            Elevside 2
          </button>
        </div>

        <h1>Elevside {page2 ? 2 : 1}</h1>
        <p>
          {page2
            ? "Vejledende indstilling af kontrolventiler"
            : "Indstil kontrolventiler [KV] så de står på " +
              assignmentData[0].desiredOpening +
              "mm"}
        </p>
        {page2 ? <AssignmentTable2 /> : <AssignmentTable1 />}
      </main>
    </>
  );
};

export default Assignment;
