import { useContext } from "react";
import { useState } from "react";
import AssignmentContext from "../context/AssignmentContext";
import InputSelect from "../functions/InputSelect";
import useEnterBlur from "../hooks/useEnterBlur";

const CreateInput = ({ index, isLast }) => {
  const { assignmentData, setAssignmentData } = useContext(AssignmentContext);

  useEnterBlur();

  const [input, setInput] =
    useState(assignmentData[index + 1] && assignmentData[index + 1].KVvalue) ||
    "";

  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (e) => {
    const isValidInput = /^[\d.,]*$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbersare allowed");
    }
    if (e.target.value.length === 0) {
      setInput(0);
      return;
    }
    setIsSelected(true);
    setInput(e.target.value);
  };

  const handleBlur = (e) => {
    const isValidInput = /^[\d.%,]*$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbers are allowed");
    }
    setIsSelected(false);
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
    <div className="flex flex-row justify-items-start my-2">
      <label className="m-0 bg-gray-100" htmlFor={"KV" + (index + 1)}>
        KV{index + 1}:&nbsp;
      </label>
      <input
        inputMode="decimal"
        type="text"
        id={"KV" + (index + 1)}
        className="max-w-[60px] text-center border-[1px] border-secondaryBG rounded"
        value={isSelected ? input : parseFloat(input).toFixed(1)}
        onBlur={handleBlur}
        onChange={handleChange}
        onClick={InputSelect}
      />
      <p>{isLast && "R"}</p>
    </div>
  );
};

export default CreateInput;
