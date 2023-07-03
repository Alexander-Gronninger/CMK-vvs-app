import { useState } from "react";
import AssignmentContext from "./AssignmentContext";
import Version3Context from "./Version3Context";

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
  ]);

  const [version3Data, setVersion3Data] = useState([
    {
      totalPD: 120,
      desiredMS: 7,
      desiredOpeningPercent: 0.5,
    },
    { KVvalue: 3, KVsize: 2 },
    { KVvalue: 6.1, KVsize: 6 },
    { KVvalue: 2.7, KVsize: 9 },
    { KVvalue: 3.6, KVsize: 7 },
    { KVvalue: 2.1, KVsize: 6 },
    { KVvalue: 4, KVsize: 3 },
  ]);

  return (
    <>
      <AssignmentContext.Provider value={{ assignmentData, setAssignmentData }}>
        <Version3Context.Provider value={{ version3Data, setVersion3Data }}>
          {children}
        </Version3Context.Provider>
      </AssignmentContext.Provider>
    </>
  );
};

export default ContextProvider;
