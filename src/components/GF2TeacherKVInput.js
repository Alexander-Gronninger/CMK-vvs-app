import { useContext, useEffect, useState } from "react";
import useEnterBlur from "../hooks/useEnterBlur";
import InputSelect from "../functions/InputSelect";
import GF2Context from "../context/GF2Context";
import { createCookie } from "../functions/Cookie";

////////////////////////////////////////////////////////////////
// Changes all KV values, used by teacher
//

const GF2TeacherKVInput = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  /* Blurs the input when user presses enter or done */
  useEnterBlur();

  /* Only allows numbers and comma */
  const isValidInput = (string) => {
    return /^[\d.,]*$/.test(string);
  };

  /* Sets the start value to the value saved in context, or empty string */
  const initialInput = GF2Data[0] && GF2Data[0].AllKV;
  const [input, setInput] = useState(initialInput);

  /* When GF2Data is updated, like if there is a cookie to retrieve in contextProvider, updates the input */
  useEffect(() => {
    setInput(initialInput);
  }, [GF2Data, initialInput]);

  /* handleChange updates the input state, but not the context */
  const handleChange = (e) => {
    /* Guard clause making sure input is a number between 1-10 */
    if (
      !isValidInput(e.target.value) ||
      e.target.value < 1 ||
      e.target.value > 10
    ) {
      return console.log("only numbers between 1 and 10 are allowed");
    }

    /* Guard clause making sure if user accidentally leaves input empty, it does not remain so */
    if (e.target.value.length === 0) {
      setInput(0);
      return;
    }

    setInput(e.target.value);
  };

  /* handleBlur updates the input state and the respective context value */
  const handleBlur = (e) => {
    setInput(e.target.value);

    /* Updates context to reflect users new input */
    setGF2Data((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].AllKV = input;
      }

      newData.forEach((data) => {
        if (data.StudentKVOpening) {
          data.StudentKVOpening = Number(input);
        }
      });

      createCookie(newData);
      return newData;
    });
  };

  return (
    <>
      <div className="flex">
        <p className="max-w-[65%]">
          1. Indstil kontrolventilerne (KV), så de alle har samme værdi (1-10)
        </p>
        <input
          className="max-w-[50px] p-0 h-[50px] text-center bg-gray-200 m-auto"
          key={"TeacherKVInput"}
          type="numeric"
          value={input}
          /* handleBlur updates the input state and the respective context value */
          onBlur={handleBlur}
          /* handleChange updates the input state, but not the context */
          onChange={handleChange}
          /* Selects the input, so typing will replace the value */
          onClick={InputSelect}
        />
      </div>
    </>
  );
};

export default GF2TeacherKVInput;
