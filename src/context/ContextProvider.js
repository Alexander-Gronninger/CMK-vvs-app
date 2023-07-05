import { useState } from "react";
import GF2Context from "./GF2Context";
import Version3Context from "./Version3Context";

const ContextProvider = ({ children }) => {
  const [GF2Data, setGF2Data] = useState([
    {
      MainOpening: 0.3,
    },
    { QV: 30.4, TeacherKVOpening: 5, StudentKVOpening: 8 },
    { QV: 35.5, TeacherKVOpening: 5, StudentKVOpening: 7 },
    { QV: 39.3, TeacherKVOpening: 5, StudentKVOpening: 6 },
    { QV: 31.2, TeacherKVOpening: 5, StudentKVOpening: 8 },
    { QV: 41.2, TeacherKVOpening: 5, StudentKVOpening: 6 },
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
      <GF2Context.Provider value={{ GF2Data, setGF2Data }}>
        <Version3Context.Provider value={{ version3Data, setVersion3Data }}>
          {children}
        </Version3Context.Provider>
      </GF2Context.Provider>
    </>
  );
};

export default ContextProvider;
