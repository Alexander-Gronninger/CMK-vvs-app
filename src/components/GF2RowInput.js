import { useContext, useState } from "react";
import useEnterBlur from "../hooks/useEnterBlur";
import AssignmentContext from "../context/AssignmentContext";
import InputSelect from "../functions/InputSelect";

const GF2RowInput = ({ index, tableCss }) => {
  const inputCss = "max-w-[40px] m-1";

  const { assignmentData, setAssignmentData } = useContext(AssignmentContext);
  useEnterBlur();

  /* Sets the start value to the value saved in context, or empty string */
  const [input, setInput] =
    useState(assignmentData[index + 1] && assignmentData[index + 1].KVvalue) ||
    "";

  /* handleChange updates the input state, but not the context */
  const handleChange = (e) => {
    const isValidInput = /^[\d.,]*$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbersare allowed");
    }
    if (e.target.value.length === 0) {
      setInput(0);
      return;
    }
    setInput(e.target.value);
  };

  /* handleBlur updates the input state and the respective context value */
  const handleBlur = (e) => {
    const isValidInput = /^[\d.%,]*$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbers are allowed");
    }
    setInput(e.target.value);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[index + 1]) {
        newData[index + 1].KVvalue = Number(e.target.value);
      }
      return newData;
    });
  };

  return (
    <>
      <td className={tableCss}>
        <input
          className={inputCss}
          key={"KVInput" + index}
          /* Index starts at 0, but the KVs are labeled 1-5, so its index + 1 to make parent components labels work */
          id={"KV" + (index + 1)}
          type="number"
          value={input}
          /* handleBlur updates the input state and the respective context value */
          onBlur={handleBlur}
          /* handleChange updates the input state, but not the context */
          onChange={handleChange}
          /* Selects the input, so typing will replace the value */
          onClick={InputSelect}
        />
      </td>
    </>
  );
};

export default GF2RowInput;
