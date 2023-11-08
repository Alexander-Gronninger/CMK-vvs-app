import { useState } from "react";
import GF2Context from "./GF2Context";
import Version3Context from "./Version3Context";

const ContextProvider = ({ children }) => {
  /* 
  The first object holds set data, every additional  object represents a valve/pipe
  Everything is set up to dynamically render based on GF2Data.length - 1
  So adding more valve/pipe objects will not require additional code
  However the UI may break
   */

  const [GF2Data, setGF2Data] = useState([
    {
      MainOpening: 0.75,
      DesiredAirspeed: 12,
      AllKV: 5,
    },
    /* { QV: 30.4, TeacherKVOpening: 5, StudentKVOpening: 1, QVKVRelation: 3 },
    { QV: 35.5, TeacherKVOpening: 5, StudentKVOpening: 1, QVKVRelation: 2.2 },
    { QV: 39.3, TeacherKVOpening: 5, StudentKVOpening: 1, QVKVRelation: 5 },
    { QV: 31.2, TeacherKVOpening: 5, StudentKVOpening: 1, QVKVRelation: 2.2 },
    { QV: 41.2, TeacherKVOpening: 5, StudentKVOpening: 1, QVKVRelation: 3.6 }, */
    { QV: 30.4, TeacherKVOpening: 5, StudentKVOpening: 6.2, QVKVRelation: 3 },
    { QV: 35.5, TeacherKVOpening: 5, StudentKVOpening: 8.4, QVKVRelation: 2.2 },
    { QV: 39.3, TeacherKVOpening: 5, StudentKVOpening: 3.7, QVKVRelation: 5 },
    { QV: 31.2, TeacherKVOpening: 5, StudentKVOpening: 8.4, QVKVRelation: 2.2 },
    { QV: 41.2, TeacherKVOpening: 5, StudentKVOpening: 5.1, QVKVRelation: 3.6 },
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
