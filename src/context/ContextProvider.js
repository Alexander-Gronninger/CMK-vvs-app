import { useState } from "react";
import AssignmentContext from "./AssignmentContext";

const ContextProvider = ({ children }) => {
  const [assignmentData, setAssignmentData] = useState([
    {
      totalPD: 120,
      desiredMS: 8,
      desiredOpening: 5,
    },
    { KVvalue: 4.5, KVsize: 2 },
    { KVvalue: 7.8, KVsize: 6 },
    { KVvalue: 8, KVsize: 9 },
    { KVvalue: 6, KVsize: 7 },
    { KVvalue: 9, KVsize: 6 },
    { KVvalue: 2.7, KVsize: 3 },
  ]);

  return (
    <>
      <AssignmentContext.Provider value={{ assignmentData, setAssignmentData }}>
        {children}
      </AssignmentContext.Provider>
    </>
  );
};

export default ContextProvider;
