import { useContext } from "react";
import { useState } from "react";
import AssignmentContext from "../context/AssignmentContext";

const CreateInput = ({ index, isLast }) => {
  const { assignmentData, setAssignmentData } = useContext(AssignmentContext);
  const [input, setInput] =
    useState(assignmentData[index + 1] && assignmentData[index + 1].KVvalue) ||
    "";

  const handleChange = (e) => {
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
        type="number"
        id={"KV" + (index + 1)}
        className="max-w-[60px] text-center border-[1px] border-secondaryBG rounded"
        value={parseFloat(input).toFixed(1)}
        onChange={handleChange}
        placeholder="null"
      />
      <p>{isLast && "R"}</p>
    </div>
  );
};

export default CreateInput;
