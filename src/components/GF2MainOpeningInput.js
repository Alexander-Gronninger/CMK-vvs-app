import React, { useContext, useState } from "react";
/* import InputSelect from "../functions/InputSelect"; */
import useEnterBlur from "../hooks/useEnterBlur";
import GF2Context from "../context/GF2Context";
import InputButtonIncrease from "./InputButtonIncrease";
import InputButtonDecrease from "./InputButtonDecrease";

const GF2MainOpeningInput = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);
  useEnterBlur();

  /* Opening input stuff */
  const initialDesiredOpening = (GF2Data[0] && GF2Data[0].MainOpening) || 0.05; // Initialize as 5% (0.05)
  const [desiredOpening, setDesiredOpening] = useState(initialDesiredOpening);
  /*   const [isInputActive, setIsInputActive] = useState(false); */

  const updateGF2Data = (newDesiredOpening) => {
    setGF2Data((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].MainOpening = newDesiredOpening.toFixed(2);
      }
      return newData;
    });
  };

  /*   const handleDesiredOpeningChange = (e) => {
    const input = e.target.value;

    // Validate and set the input
    if (/^[\d.%,]*$/.test(input)) {
      setIsInputActive(true);
      // Remove any non-numeric characters and convert to a decimal value
      const newDesiredOpening = parseFloat(input.replace(/[^0-9.]/g, "")) / 100;
      setDesiredOpening(newDesiredOpening);
      updateGF2Data(newDesiredOpening);
    }
  }; */

  /*   const handleDesiredOpeningBlur = () => {
    setIsInputActive(false);

    // Ensure the value is between 0.05 (5%) and 1 (100%)
    const percentage = Math.min(Math.max(desiredOpening, 0.05), 1);
    setDesiredOpening(percentage);
    updateGF2Data(percentage);
  }; */

  const decimalToPercentage = (decimalValue) => {
    const percentage = (decimalValue * 100).toFixed();
    return percentage + "%";
  };

  /* Amount of increase / decrease for buttons */
  const updateAmount = 0.05;

  // Functions passed to InputButtonIncrease & InputButtonDecrease
  const increaseMainOpening = () => {
    setDesiredOpening((prevDesiredOpening) => {
      const newDesiredOpening = Math.min(prevDesiredOpening + updateAmount, 1);
      updateGF2Data(newDesiredOpening);
      return newDesiredOpening;
    });
  };

  const decreaseMainOpening = () => {
    setDesiredOpening((prevDesiredOpening) => {
      const newDesiredOpening = Math.max(
        prevDesiredOpening - updateAmount,
        0.05
      );
      updateGF2Data(newDesiredOpening);
      return newDesiredOpening;
    });
  };

  return (
    <div className="flex flex-col">
      <InputButtonIncrease onClickFunction={increaseMainOpening} />
      <p className="text-center">{decimalToPercentage(desiredOpening)}</p>

      {/* Uncomment this and associated functions to restore input functionality */}
      {/* <input
        inputMode="numeric"
        key="desiredOpeningInput"
        type="text"
        id="desiredOpening"
        className="max-w-[40px] min-w-[10px] text-center bg-gray-200 h-10"
        value={
          isInputActive
            ? (desiredOpening * 100).toFixed() + "%"
            : decimalToPercentage(desiredOpening)
        }
        onBlur={handleDesiredOpeningBlur}
        onChange={handleDesiredOpeningChange}
        onClick={InputSelect}
      /> */}
      <InputButtonDecrease onClickFunction={decreaseMainOpening} />
    </div>
  );
};

export default GF2MainOpeningInput;
