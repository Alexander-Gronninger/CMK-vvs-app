import { useState } from "react";
import CreateInput from "../components/CreateInput";
import { useContext } from "react";
import AssignmentContext from "../context/AssignmentContext";
import CalcSum from "../functions/CalcSum";

const Create = () => {
  const { assignmentData, setAssignmentData } = useContext(AssignmentContext);

  // ------------------------------------- //
  // Handling various inputs

  const [totalPD, setTotalPD] =
    useState(assignmentData[0] && assignmentData[0].totalPD) || "";

  const handleTotalPD = (e) => {
    setTotalPD(e.target.value);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].totalPD = Number(e.target.value);
      }
      return newData;
    });
  };

  const [desiredMS, setDesiredMS] =
    useState(assignmentData[0] && assignmentData[0].desiredMS) || "";

  const handleDesiredMS = (e) => {
    setDesiredMS(e.target.value);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredMS = Number(e.target.value);
      }
      return newData;
    });
  };

  const [desiredOpening, setDesiredOpening] =
    useState(assignmentData[0] && assignmentData[0].desiredOpening) || "";

  const handleDesiredOpening = (e) => {
    if (e.target.value < 0 || e.target.value > 10) {
      return;
    }

    setDesiredOpening(e.target.value);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredOpening = Number(e.target.value);
      }
      return newData;
    });
  };

  // ------------------------------------- //
  // Outside functions

  let averageMS = Number(CalcSum(assignmentData) / (assignmentData.length - 1));

  return (
    <main>
      <h1>Indjustering af ventilationsanlæg efter proportionalmetoden</h1>
      <p>Lærerside</p>
      <label htmlFor="totalPD">Indtast total PD (Lufttryk[Pa])</label>
      <div className="flex bg-gray-200 max-w-fit mb-6">
        <input
          type="number"
          id="totalPD"
          className="max-w-content min-w-[10px] text-right bg-gray-200"
          value={totalPD}
          onChange={handleTotalPD}
        />
        <p className="leading-6">&nbsp;[Pa]</p>
      </div>

      <div className="border-gray-600 border-2 max-w-[80%] p-4">
        <h2>
          Indtsat lufthastighed på de enkelte kontrolventiler [m/s], når
          kontrolventiler = 5 mm.
        </h2>
        {/* The amount of inputs needs to be the amount of KVinputs in the assignmentData array. Those are the only ones that change */}
        {[...Array(assignmentData.length - 1)].map((_, index) => (
          <CreateInput
            key={"CreationInput" + index}
            index={index}
            isLast={false}
          ></CreateInput>
        ))}
      </div>
      <p className="my-4 mx-4">
        Gennemsnitlig lufthast. [m/s]) med KV på 5 mm:&nbsp;
        {parseFloat(averageMS).toFixed(1)} [m/s]
      </p>
      <div className="flex my-4 max-w-fit">
        <label htmlFor="desiredMS">Ønsket lufthastighed:</label>
        <div className="flex bg-gray-200 max-w-[100px] mb-6">
          <input
            type="number"
            id="desiredMS"
            className="max-w-content min-w-[10px] text-right bg-gray-200"
            value={parseFloat(desiredMS).toFixed(1)}
            onChange={handleDesiredMS}
          />
          <p className="leading-6">&nbsp;[m/s]</p>
        </div>
      </div>
      <div className="my-4 max-w-fit">
        <label htmlFor="desiredOpening">Åbning på hovedspjæld (1-10 mm):</label>
        <div className="flex bg-gray-200 max-w-[100px] mb-6">
          <input
            type="number"
            id="desiredOpening"
            className="max-w-content min-w-[10px] text-right bg-gray-200"
            value={parseFloat(desiredOpening).toFixed(0)}
            onChange={handleDesiredOpening}
          />
          <p className="leading-6">&nbsp;[mm]</p>
        </div>
      </div>
    </main>
  );
};

export default Create;
