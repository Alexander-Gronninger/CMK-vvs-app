import { useState } from "react";
import CreateInput from "../components/CreateInput";
import { useContext } from "react";
import AssignmentContext from "../context/AssignmentContext";
import CalcSum from "../functions/CalcSum";
import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import InputSelect from "../functions/InputSelect";
import useEnterBlur from "../hooks/useEnterBlur";

const Version2Create = () => {
  const { assignmentData, setAssignmentData } = useContext(AssignmentContext);

  useEnterBlur();

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

  const [inputMSSelected, setInputMSSelected] = useState(false);

  const handleDesiredMSChange = (e) => {
    const isValidInput = /^[\d.,]*$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbersare allowed");
    }
    if (e.target.value.length === 0) {
      setDesiredMS(0);
      return;
    }
    setInputMSSelected(true);
    setDesiredMS(e.target.value);
  };

  const handleDesiredMSBlur = (e) => {
    setInputMSSelected(false);
    const sanitizedInput = e.target.value.replace(/\s*\[m\/s\]$/, "");
    setDesiredMS(sanitizedInput);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredMS = Number(sanitizedInput);
      }
      return newData;
    });
  };

  /* Desired opening code */

  const [desiredOpening, setDesiredOpening] =
    useState(assignmentData[0] && assignmentData[0].desiredOpening) || "";

  const [inputOpeningSelected, setInputOpeningSelected] = useState();

  const handleDesiredOpeningChange = (e) => {
    const isValidInput = /^[\d.,]*$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbersare allowed");
    }
    if (e.target.value.length === 0) {
      setDesiredOpening(0);
      return;
    }
    setInputOpeningSelected(true);
    setDesiredOpening(e.target.value);
  };

  const handleDesiredOpeningBlur = (e) => {
    setInputOpeningSelected(false);
    const sanitizedInput = e.target.value.replace(/\s*\[mm\]$/, "");
    if (sanitizedInput < 0 || sanitizedInput > 10) {
      return;
    }

    setDesiredOpening(sanitizedInput);
    setAssignmentData((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredOpening = Number(sanitizedInput);
      }
      return newData;
    });
  };

  let averageMS = Number(CalcSum(assignmentData) / (assignmentData.length - 1));

  return (
    <>
      <SiteDescription />
      <H1>Lærerside</H1>
      <div className="flex max-w-fit mb-6">
        <label htmlFor="totalPD">Indtast total PD (Lufttryk[Pa])&nbsp;</label>
        <input
          inputMode="numeric"
          type="number"
          id="totalPD"
          className="w-16 text-center border-[1px] border-secondaryBG rounded"
          value={totalPD}
          onChange={handleTotalPD}
          onClick={InputSelect}
        />
        <p className="leading-6">&nbsp;[Pa]</p>
      </div>

      <div className="border-secondaryBG rounded border-2 m-4 p-4">
        <h2 className="font-medium m-2">
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
      <div className="flex my-2 max-w-fit">
        <label htmlFor="desiredMS">Ønsket lufthastighed:&nbsp;</label>
        <input
          inputMode="numeric"
          type="text"
          id="desiredMS"
          className="max-w-[100px] text-center border-[1px] border-secondaryBG rounded"
          value={
            inputMSSelected
              ? desiredMS
              : parseFloat(desiredMS).toFixed(1) + " [m/s]"
          }
          onClick={InputSelect}
          onBlur={handleDesiredMSBlur}
          onChange={handleDesiredMSChange}
        />
      </div>
      <div className="my-2 max-w-fit flex flex-col items-center">
        <label htmlFor="desiredOpening">
          Åbning på hovedspjæld (1-10 mm):&nbsp;
        </label>
        <input
          inputMode="numeric"
          type="text"
          id="desiredOpening"
          className="max-w-[100px] text-center border-[1px] border-secondaryBG rounded"
          value={
            inputOpeningSelected
              ? desiredOpening
              : parseFloat(desiredOpening).toFixed(1) + " [mm]"
          }
          onClick={InputSelect}
          onBlur={handleDesiredOpeningBlur}
          onChange={handleDesiredOpeningChange}
        />
      </div>
    </>
  );
};

export default Version2Create;
