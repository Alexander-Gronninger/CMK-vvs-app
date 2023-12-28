import { useCallback, useContext, useEffect, useRef, useState } from "react";
/* import InputSelect from "../functions/InputSelect"; */
import useEnterBlur from "../hooks/useEnterBlur";
import GF2Context from "../context/GF2Context";
import InputButtonIncrease from "./InputButtonIncrease";
import InputButtonDecrease from "./InputButtonDecrease";
import { createCookie } from "../functions/Cookie";

const GF2MainOpeningSetting = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  /* Blurs the input when user presses enter or done on iphone */
  useEnterBlur();

  /*  */
  const initialDesiredOpening = (GF2Data[0] && GF2Data[0].MainOpening) || 0.05; // Initialize as 5% (0.05)
  const [desiredOpening, setDesiredOpening] = useState(initialDesiredOpening);

  /* When GF2Data is updated, like if there is a cookie to retrieve in contextProvider, updates the input */
  useEffect(() => {
    setDesiredOpening(initialDesiredOpening);
  }, [GF2Data, initialDesiredOpening]);

  /* updating GF2Data & cookie to reflect changes in desiredOpening */
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

  /* converting 0-1 to 0-100% */
  const decimalToPercentage = (decimalValue) => {
    const percentage = (decimalValue * 100).toFixed(0);
    return percentage + "%";
  };

  /* Amount of increase / decrease for buttons */
  const updateAmount = 0.05;

  // Functions passed to InputButtonIncrease & InputButtonDecrease
  /* Math.min & Math.max returns the smallest and highest of the numbers, ie prevDesiredOpening + updateAmount, or 1, depending on which is smallest, just reversed for Math.max */
  const increaseMainOpening = () => {
    setDesiredOpening((prevDesiredOpening) => {
      const newDesiredOpening = Math.min(prevDesiredOpening + updateAmount, 1);
      return newDesiredOpening;
    });
  };

  const decreaseMainOpening = () => {
    setDesiredOpening((prevDesiredOpening) => {
      const newDesiredOpening = Math.max(
        prevDesiredOpening - updateAmount,
        0.05
      );
      return newDesiredOpening;
    });
  };

  /* for tracking if its initial render, in which case dont execute updateGF2Data in the useEffect */
  const isInitialRender = useRef(true);

  /* updateGF2Data when desiredOpening changes, except on initial render */
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
      <InputButtonDecrease onClickFunction={decreaseMainOpening} />
    </div>
  );
};

export default GF2MainOpeningSetting;
