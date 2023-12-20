import { useState } from "react";
import GF2Context from "./GF2Context";
import { getCookie } from "../functions/Cookie";

const ContextProvider = ({ children }) => {
  /* 
  The first object holds set data, every additional  object represents a valve/pipe
  Everything is set up to dynamically render based on GF2Data.length - 1
  So adding more valve/pipe objects will not require additional code
  However the UI may break
   */

  const initializeGF2Data = () => {
    const savedGF2DataString = getCookie("GF2Data");
    if (savedGF2DataString) {
      return JSON.parse(savedGF2DataString);
    } else {
      return [
        {
          MainOpening: 0.75,
          DesiredAirspeed: 12,
          AllKV: 5,
        },
        { QV: 30.4, StudentKVOpening: 5, QVKVRelation: 3 },
        { QV: 35.5, StudentKVOpening: 5, QVKVRelation: 2.2 },
        { QV: 39.3, StudentKVOpening: 5, QVKVRelation: 5 },
        { QV: 31.2, StudentKVOpening: 5, QVKVRelation: 2.2 },
        { QV: 41.2, StudentKVOpening: 5, QVKVRelation: 3.6 },
        /* Testing data, this data is preset so that the balls in the pipes should be more or less equal */
        /* { QV: 30.4, StudentKVOpening: 6.2, QVKVRelation: 3 },
        { QV: 35.5, StudentKVOpening: 8.4, QVKVRelation: 2.2 },
        { QV: 39.3, StudentKVOpening: 3.7, QVKVRelation: 5 },
        { QV: 31.2, StudentKVOpening: 8.4, QVKVRelation: 2.2 },
        { QV: 41.2, StudentKVOpening: 5.1, QVKVRelation: 3.6 }, */
      ];
    }
  };

  const [GF2Data, setGF2Data] = useState(() => initializeGF2Data());

  return (
    <>
      <GF2Context.Provider value={{ GF2Data, setGF2Data }}>
        {children}
      </GF2Context.Provider>
    </>
  );
};

export default ContextProvider;
