import { useContext, useEffect, useState } from "react";
import GF2StudentKVValueInput from "../components/GF2StudentKVValueInput";
import ValveRotation from "../components/ValveRotation";
import GF2Context from "../context/GF2Context";

const GF2StudentKV = ({ tableCss, index }) => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  /* Value is the KVs opening */
  /* Sets the start value to the value saved in context, or empty string */
  const [value, setValue] =
    useState(GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening) || "";

  useEffect(() => {
    updateStudentKV();

    /* Putting updateStudentKV in dependency array will create an infinite loop */
    // eslint-disable-next-line
  }, [value]);

  function updateStudentKV() {
    setGF2Data((prevData) => {
      let newData = [...prevData];
      newData[index + 1].StudentKVOpening = Number(value);
      return newData;
    });
  }

  return (
    <>
      {/* This component has a rotatable image which can be used to adjust KVValue */}
      <ValveRotation
        key={"KVRotation" + index}
        id={"KVRotation" + index}
        size="35px"
        index={index}
        value={value}
        setValue={setValue}
      />
      {/* This component has an input, and all the code needed to handle it, it handles student KVValue */}
      <GF2StudentKVValueInput
        key={"KVInput" + index}
        id={"KVInput" + index}
        tableCss={tableCss}
        index={index}
        value={value}
        setValue={setValue}
      />
    </>
  );
};

export default GF2StudentKV;
