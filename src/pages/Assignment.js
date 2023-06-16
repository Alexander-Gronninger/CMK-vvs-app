import { useContext, useState } from "react";
import Table from "../templates/Table";
import AssignmentContext from "../context/AssignmentContext";
import Table2 from "../templates/Table2";

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
            ? "Automatiske indstilling af ventiler"
            : "Indstil kontrolventiler [KV] så de står på " +
              assignmentData[0].desiredOpening +
              "mm"}
        </p>
        {page2 ? <Table2 /> : <Table />}
      </main>
    </>
  );
};

export default Assignment;
