import { useCallback, useContext, useEffect, useRef, useState } from "react";
/* import InputSelect from "../functions/InputSelect"; */
import useEnterBlur from "../hooks/useEnterBlur";
import GF2Context from "../context/GF2Context";
import InputButtonIncrease from "./InputButtonIncrease";
import InputButtonDecrease from "./InputButtonDecrease";
import { createCookie } from "../functions/Cookie";

const GF2MainOpeningInput = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);
  useEnterBlur();

  /* Opening input stuff */
  const initialDesiredOpening = (GF2Data[0] && GF2Data[0].MainOpening) || 0.05; // Initialize as 5% (0.05)
  const [desiredOpening, setDesiredOpening] = useState(initialDesiredOpening);
  /* When loading a cookie, this updates the input state */
  useEffect(() => {
    setDesiredOpening(initialDesiredOpening);
  }, [GF2Data, initialDesiredOpening]);

  /*   const [isInputActive, setIsInputActive] = useState(false); */

  const updateGF2Data = useCallback(
    (newDesiredOpening) => {
      setGF2Data((prevData) => {
        if (prevData[0]?.MainOpening !== newDesiredOpening) {
          let newData = [...prevData];
          if (newData[0]) {
            newData[0].MainOpening = newDesiredOpening;
          }
          createCookie(newData);
          return newData;
        }
        return prevData;
      });
    },
    [setGF2Data]
  );

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
      /* updateGF2Data(newDesiredOpening); */
      return newDesiredOpening;
    });
  };

  const decreaseMainOpening = () => {
    setDesiredOpening((prevDesiredOpening) => {
      const newDesiredOpening = Math.max(
        prevDesiredOpening - updateAmount,
        0.05
      );
      /* updateGF2Data(newDesiredOpening); */
      return newDesiredOpening;
    });
  };

  /* for tracking if its initial render, in which case dont execute updateGF2Data in the useEffect */
  const isInitialRender = useRef(true);
  useEffect(() => {
    // Check if it's not the initial render
    if (!isInitialRender.current) {
      updateGF2Data(desiredOpening);
    } else {
      // It's the initial render, set the ref to false
      isInitialRender.current = false;
    }
  }, [desiredOpening, updateGF2Data]);

  return (
    <div className="flex flex-col select-none">
      <InputButtonIncrease onClickFunction={increaseMainOpening} />
      <div className="h-[50px] flex place-content-center place-items-center ">
        <p className="text-center ">{decimalToPercentage(desiredOpening)}</p>
      </div>

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
