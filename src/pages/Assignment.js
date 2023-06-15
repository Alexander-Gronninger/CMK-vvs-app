import { useContext } from "react";
import Table from "../templates/Table";
import AssignmentContext from "../context/AssignmentContext";

const Assignment = () => {
  const { assignmentData } = useContext(AssignmentContext);

  return (
    <>
      <main>
        <h1>Elevside 1</h1>
        <p>
          Indstil kontrolventiler [KV] så de står på{" "}
          {assignmentData[0].desiredOpening} mm
        </p>
        <Table />
      </main>
    </>
  );
};

export default Assignment;
